const { where } = require('sequelize');
const models = require('../models')

// Function that create a new User
function createUser(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        photo: req.body.photo
    }

    // Verify if the phone has 9 digits
    if (user.phone.length !== 9 || isNaN(user.phone)) {
        return res.status(422).json({
            message: "Phone number must be 9 digits long"
        });
    }

    // verify if email and phone are unique
    models.user.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                    email: req.body.email
                },
                {
                    phone: req.body.phone
                }
            ]
        }
    }).then(existingUser => {
        if (existingUser) {
            // If the email already exists, returns error 409
            if (existingUser.email === req.body.email) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            // If the phone already exists, returns error 409
            else if (existingUser.phone === req.body.phone) {
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
    const updatedUserDate = req.body;

    if (updatedUserDate.phone.length !== 9 || isNaN(updatedUserDate.phone)) {
        return res.status(422).json({
            message: "Phone number must be 9 digits long"
        });
    }

    models.user.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                    email: req.body.email
                },
                {
                    phone: req.body.phone
                }
            ]
        }
    }).then(existingUser => {
        if (existingUser) {
            if (existingUser.email === updatedUserDate.email && existingUser.idUser !== updatedUserDate.idUser) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            else if (existingUser.phone === updatedUserDate.phone && existingUser.idUser !== updatedUserDate.idUser) {
                return res.status(409).json({
                    message: "Phone already exists"
                });
            }
        }else{
            models.user.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
        
                Object.assign(user, updatedUserDate);
        
                return user.save();
            })
            .then(updatedUser => {
                res.status(200).json({
                    message: "User updated successfully",
                    user: updatedUser
                });
            })
            .catch(error => {
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

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    editUser: editUser
}