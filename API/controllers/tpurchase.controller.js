const models = require('../models');

// Function to create a type purchase
function createTypePurchase(req, res){
    const purchaseType = {
        typepurchase: req.body.typepurchase
    }

    models.purchasetype.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                typepurchase: req.body.typepurchase
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.typepurchase === req.body.typepurchase) {
                return res.status(409).json({
                    message: "Type purchase already exists"
                });
            }
        } else {
            models.purchasetype.create(purchaseType)
            .then(result => {
                res.status(200).json({
                    message: "Type purchase created successfully",
                    typepurchase: result
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
    const idtypepurchase = req.params.idtypepurchase;
    const updatedTypeData = req.body;

    models.purchasetype.findByPk(idtypepurchase)
    .then(typepurchase => {
        if (!typepurchase) {
            return res.status(404).json({
                message: "Type purchase not found"
            });
        }
        models.purchasetype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typepurchase: updatedTypeData.typepurchase
                }]
            }
        }).then(existingType => {
            if (existingType) {
                return res.status(409).json({
                    message: "Type purchase already exists"
                });
            }
            Object.assign(typepurchase, updatedTypeData);
            return typepurchase.save();
        }).then(updatedTypeData => {
            res.status(200).json({
                message: "Type purchase updated successfully",
                typepurchase: updatedTypeData
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