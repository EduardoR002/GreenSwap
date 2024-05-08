const models = require('../models')

// Function to create a type notification
function createTypeNotification(req, res){
    const typenotification = {
        name: req.body.name,
        description: req.body.description
    }

    models.typenotification.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                name: req.body.name
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.name === req.body.name) {
                return res.status(400).json({
                    message: "Type notification name already exists"
                });
            }
        }else{
            models.typenotification.create(typenotification)
            .then(result => {
                res.status(200).json({
                    message: "Type notification created successfully",
                    typenotification: result
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

// Function to get all type notification
function getAllTypes(req, res){
    models.typenotification.findAll()
    .then(types => {
        if(!types || types.length === 0){
            return res.status(404).json({
                message: "No types found"
            });
        }
        res.status(200).json({
            message: "Type notifications found successfully",
            types: types
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

module.exports = {
    createTypeNotification: createTypeNotification,
    getAllTypes: getAllTypes
}