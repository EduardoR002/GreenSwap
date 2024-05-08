const models = require('../models');

// Function to create a type purchase
function createTypePurchase(req, res){
    const purchaseType = {
        type: req.body.type
    }

    models.purchasetype.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                type: req.body.type
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.type === req.body.type) {
                return res.status(409).json({
                    message: "Type purchase already exists"
                });
            }
        } else {
            models.purchasetype.create(purchaseType)
            .then(result => {
                res.status(200).json({
                    message: "Type purchase created successfully",
                    type: result
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

// Function to get all type purchases
function getAllTypes(req, res){
    models.purchasetype.findAll()
    .then(types => {
        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }
        res.status(200).json({
            message: "Type purchases found successfully",
            types: types
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to edit a type purchase
function editTypePurchase(req, res){
    const idtype = req.params.idtype;
    const updatedTypeData = req.body;

    models.purchasetype.findByPk(idtype)
    .then(type => {
        if (!type) {
            return res.status(404).json({
                message: "Type purchase not found"
            });
        }
        models.purchasetype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    type: updatedTypeData.type
                }]
            }
        }).then(existingType => {
            if (existingType) {
                return res.status(409).json({
                    message: "Type purchase already exists"
                });
            }
            Object.assign(type, updatedTypeData);
            return type.save();
        }).then(updatedTypeData => {
            res.status(200).json({
                message: "Type purchase updated successfully",
                type: updatedTypeData
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

module.exports = {
    createTypePurchase: createTypePurchase,
    getAllTypes: getAllTypes,
    editTypePurchase: editTypePurchase
}