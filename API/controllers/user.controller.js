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

function getUser(req, res){
    const userID = req.params.userID;

    models.user.findOne({where: { id: userID} }     )
    .then(user => {
        if (!user){
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

module.exports = {
    createUser: createUser,
    getUser: getUser
}