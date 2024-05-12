const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokenCertifier, createTokenUser } = require('./tokens.controller.js');
const token = require('../models/token.js');

// Function that create a new User
function createUser(req, res) {
    const { name, email, password, phone, address, description, photo } = req.body;

    // Check if any field is empty
    if (!name || !email || !password || !phone || !address) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    const user = {
        name,
        email,
        password: '',
        phone,
        address,
        description,
        photo
    };

    // Hash da senha usando bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                message: "Error hashing password",
                error: err
            });
        }
        
        user.password = hashedPassword;

        // Verify if the phone has 9 digits
        if (user.phone.length !== 9 || isNaN(user.phone)) {
            return res.status(422).json({
                message: "Phone number must be 9 digits long"
            });
        }

        // verify if email and phone are unique
        models.user.findOne({
            where: {
                [models.Sequelize.Op.or]: [
                    { email },
                    { phone }
                ]
            }
        }).then(existingUser => {
            if (existingUser) {
                // If the email already exists, returns error 409
                if (existingUser.email === email) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }
                // If the phone already exists, returns error 409
                else if (existingUser.phone === phone) {
                    return res.status(409).json({
                        message: "Phone number already exists"
                    });
                }
            } else {
                // If the email and the phone are new in the database, then proceed to create a new user
                models.user.create(user).then(result => {
                    res.status(200).json({
                        message: "User created successfully",
                        user: result
                    });
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    });
}


// Function used to get all data of one user
function getUser(req, res){
    const idUser = req.params.userId;
    models.user.findOne({ where: { idUser: idUser } })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            
            res.status(200).json({
                message: "User found successfully",
                user: user
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to get all users data
function getAllUsers(req, res){
    models.user.findAll()
    .then(users => {
        if(!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        res.status(200).json({
            message: "Users found successfully",
            users: users
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function used to delete one user
function deleteUser(req, res){
    const userId = req.params.userId;

    models.user.destroy({
        where: {
            idUser: userId
        }
    })
    .then(deletedRows => {
        if (deletedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function used to edit data from one user
function editUser(req, res){
    const userId = req.params.userId;
    const updatedUserData = req.body;

    if (updatedUserData.phone.length !== 9 || isNaN(updatedUserData.phone)) {
        return res.status(422).json({
            message: "Phone number must be 9 digits long"
        });
    }

    models.user.findByPk(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if email or phone number is being updated
        if (
            updatedUserData.email !== user.email ||
            updatedUserData.phone !== user.phone
        ) {
            // If so, check if the new email or phone already exists
            models.user.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                            email: updatedUserData.email
                        },
                        {
                            phone: updatedUserData.phone
                        }
                    ]
                }
            }).then(existingUser => {
                if (existingUser) {
                    if (existingUser.email === updatedUserData.email && existingUser.idUser !== userId) {
                        return res.status(409).json({
                            message: "Email already exists"
                        });
                    }
                    if (existingUser.phone === updatedUserData.phone && existingUser.idUser !== userId) {
                        return res.status(409).json({
                            message: "Phone already exists"
                        });
                    }
                }
                // If no conflict, update the user
                Object.assign(user, updatedUserData);
                return user.save();
            }).then(updatedUser => {
                res.status(200).json({
                    message: "User updated successfully",
                    user: updatedUser
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        } else {
            // If email and phone are not being updated, simply update the user
            Object.assign(user, updatedUserData);
            return user.save().then(updatedUser => {
                res.status(200).json({
                    message: "User updated successfully",
                    user: updatedUser
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function loginUser(req, res) {
    const { email, password } = req.body;

    // Find user by email
    models.user.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                // User not found, check certifier
                models.certifier.findOne({ where: { email: email } })
                    .then(certifier => {
                        if (!certifier) {
                            // Neither user nor certifier found
                            return res.status(404).json({
                                message: "User not found"
                            });
                        }
                        // Certifier found, check password
                        if (password !== certifier.password) {
                            return res.status(401).json({
                                message: "Incorrect password"
                            });
                        }
                        // Password matched, generate token and send response
                        createTokenCertifier(certifier.email, certifier.idcertifier, 'certifier')
                            .then(token => {
                                res.cookie('token', token, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: 'Strict'
                                });
                                return res.status(200).json({
                                    message: "Login successful",
                                    token: token,
                                    user: certifier
                                });
                            })
                            .catch(error => {
                                return res.status(500).json({
                                    message: "Something went wrong",
                                    error: error
                                });
                            });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        });
                    });
            } else {
                // User found, check password
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            return res.status(401).json({
                                message: "Incorrect password"
                            });
                        }
                        // Password matched, find seller
                        models.seller.findOne({ where: { userId: user.idUser}})
                            .then(seller => {
                                // Check if user is also a seller
                                if (!seller) {
                                    createTokenUser(user.email, user.idUser, 'user')
                                        .then(token => {
                                            res.cookie('token', token, {
                                                httpOnly: true,
                                                secure: true,
                                                sameSite: 'Strict'
                                            });
                                            return res.status(200).json({
                                                message: "Login successful",
                                                token: token,
                                                user: user
                                            });
                                        })
                                        .catch(error => {
                                            return res.status(500).json({
                                                message: "Something went wrong",
                                                error: error
                                            });
                                        });
                                } else {
                                    // User is also a seller, generate seller token and send response
                                    createTokenUser(user.email, user.idUser, 'seller')
                                        .then(token => {
                                            res.cookie('token', token, {
                                                httpOnly: true,
                                                secure: true,
                                                sameSite: 'Strict'
                                            });
                                            return res.status(200).json({
                                                message: "Login successful",
                                                token: token,
                                                user: user
                                            });
                                        })
                                        .catch(error => {
                                            return res.status(500).json({
                                                message: "Something went wrong",
                                                error: error
                                            });
                                        });
                                }
                            })
                            .catch(error => {
                                return res.status(500).json({
                                    message: "Something went wrong",
                                    error: error
                                });
                            });
                    })
                    .catch(error => {
                        return res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        });
                    });
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    editUser: editUser,
    loginUser: loginUser
}