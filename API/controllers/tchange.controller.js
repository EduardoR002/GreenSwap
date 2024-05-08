const models = require('../models')

// Function to create a type change
function createTypeChange(req, res){
    const typechange = {
        typechange: req.body.typechange
    }

    models.typechange.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                typechange: req.body.typechange
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.typechange === req.body.typechange) {
                return res.status(409).json({
                    message: "Type change already exists"
                });
            }
        }else{
            models.typechange.create(typechange)
            .then(result => {
                res.status(200).json({
                    message: "Type change created successfully",
                    typechange: result
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

// Function to get all type change
function getAllTypes(req, res){
    models.typechange.findAll()
    .then(types => {
        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }
        res.status(200).json({
            message: "Type change found successfully",
            types: types
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to edit a type change
function editTypechange(req, res){
    const idtypechange = req.params.idtypechange;
    const updatedTypeData = req.body;

    models.typechange.findByPk(idtypechange)
    .then(typechange => {
        if (!typechange) {
            return res.status(404).json({
                message: "Type change not found"
            });
        }
        models.typechange.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typechange: updatedTypeData.typechange
                }]
            }
        }).then(existingType => {
            if (existingType) {
                return res.status(409).json({
                    message: "Type change already exists"
                });
            }
            Object.assign(typechange, updatedTypeData);
            return typechange.save();
        }).then(updatedTypeData => {
            res.status(200).json({
                message: "Type change updated successfully",
                typechange: updatedTypeData
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
    createTypeChange: createTypeChange,
    getAllTypes: getAllTypes,
    editTypechange: editTypechange
}