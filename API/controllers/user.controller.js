const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokenCertifier, createTokenUser } = require('./tokens.controller.js');
const token = require('../models/token.js');

// Function that create a new User
async function createUser(req, res) {
    const { name, email, password, phone, address, description, photo } = req.body;

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

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        if (user.phone.length !== 9 || isNaN(user.phone)) {
            return res.status(422).json({
                message: "Phone number must be 9 digits long"
            });
        }

        const existingUser = await models.user.findOne({
            where: {
                [models.Sequelize.Op.or]: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            } else if (existingUser.phone === phone) {
                return res.status(409).json({
                    message: "Phone number already exists"
                });
            }
        } else {
            const result = await models.user.create(user);
            return res.status(200).json({
                message: "User created successfully",
                user: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}


// Function used to get all data of one user
// Function used to get all data of one user
async function getUser(req, res){
    try {
        const idUser = req.params.userId;
        console.log('ID do usuário:', idUser); // Adiciona um log para verificar o ID do usuário

        const user = await models.user.findOne({ where: { idUser: idUser } });

        if (!user) {
            console.log('Usuário não encontrado'); // Adiciona um log se o usuário não for encontrado
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        console.log('Usuário encontrado:', user); // Adiciona um log se o usuário for encontrado
        res.status(200).json({
            message: "User found successfully",
            user: user
        });
    } catch (error) {
        console.log('Error:', error);
        console.log('Erro ao buscar usuário:', error); // Adiciona um log se ocorrer um erro
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function used to get all users data
async function getAllUsers(req, res){
    try {
        const users = await models.user.findAll();
        if(!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        return res.status(200).json({
            message: "Users found successfully",
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function used to delete one user
async function deleteUser(req, res){
    const userId = req.params.userId;

    try {
        const deletedRows = await models.user.destroy({
            where: {
                idUser: userId
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function used to edit data from one user
async function editUser(req, res){
    const userId = req.params.userId;
    const updatedUserData = req.body;

    if (updatedUserData.phone.length !== 9 || isNaN(updatedUserData.phone)) {
        return res.status(422).json({
            message: "Phone number must be 9 digits long"
        });
    }

    try {
        const user = await models.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (
            updatedUserData.email !== user.email ||
            updatedUserData.phone !== user.phone
        ) {
            const existingUser = await models.user.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                            email: updatedUserData.email
                        },
                        {
                            phone: updatedUserData.phone
                        }
                    ]
                }
            });

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
            Object.assign(user, updatedUserData);
            const updatedUser = await user.save();
            return res.status(200).json({
                message: "User updated successfully",
                user: updatedUser
            });
        } else {
            Object.assign(user, updatedUserData);
            const updatedUser = await user.save();
            return res.status(200).json({
                message: "User updated successfully",
                user: updatedUser
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await models.user.findOne({ where: { email: email } });

        if (!user) {
            // User not found, check certifier
            const certifier = await models.certifier.findOne({ where: { email: email } });

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
            const token = await createTokenCertifier(certifier.email, certifier.idcertifier, 'certifier');
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
        } else {
            // User found, check password
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }

            // Password matched, find seller
            const seller = await models.seller.findOne({ where: { userId: user.idUser }});

            if (!seller) {
                const token = await createTokenUser(user.email, user.idUser, 'user');
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
            } else {
                // User is also a seller, generate seller token and send response
                const token = await createTokenUser(user.email, user.idUser, 'seller');
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
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    editUser: editUser,
    loginUser: loginUser
}