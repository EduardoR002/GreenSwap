const models = require('../models')

function save(req, res){
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        photo: req.body.photo
    }

    models.User.create(user).then(result => {
        res.status(201).json({
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

module.exports = {
    save: save
}