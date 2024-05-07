const models = require('../models')

// Function to create a type notification
function createTypeNotification(req, res){
    const typenotification = {
        typenotification: req.body.typenotification
    }

    models.typenotification.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                typenotification: req.body.typenotification
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.typenotification === req.body.typenotification) {
                return res.status(409).json({
                    message: "Type notification already exists"
                });
            }
        }else{
            models.typenotification.create(typenotification).then(result => {
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

module.exports = {
    createTypeNotification: createTypeNotification
}