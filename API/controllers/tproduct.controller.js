const models = require('../models')

// Function to create a type product
function createTypeProduct(req, res){
    const typeproduct = {
        typeproduct: req.body.typeproduct
    }

    models.typeproduct.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                typeproduct: req.body.typeproduct
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.typeproduct === req.body.typeproduct) {
                return res.status(409).json({
                    message: "Type product already exists"
                });
            }
        }else{
            models.typeproduct.create(typeproduct).then(result => {
                res.status(200).json({
                    message: "Type product created successfully",
                    typeproduct: result
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

// Function to get all type products
function getAllTypes(req, res){
    models.typeproduct.findAll()
    .then(types => {
        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }
        res.status(200).json({
            message: "Type products found successfully",
            types: types
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to edit a type product
function editTypeProduct(req, res){
    const idtypeproduct = req.params.idtypeproduct;
    const updatedTypeData = req.body;

    models.typeproduct.findByPk(idtypeproduct)
    .then(typeproduct =>{
        if (!typeproduct) {
            return res.status(404).json({
                message: "Type product not found"
            });
        }
        models.typeproduct.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typeproduct: updatedTypeData.typeproduct
                }]
            }
        }).then(existingType => {
            if (existingType) {
                return res.status(409).json({
                    message: "Type product already exists"
                });
            }
            Object.assign(typeproduct, updatedTypeData);
            return typeproduct.save();
        }).then(updatedTypeData => {
            res.status(200).json({
                message: "Type product updated successfully",
                typeproduct: updatedTypeData
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
    createTypeProduct: createTypeProduct,
    getAllTypes: getAllTypes,
    editTypeProduct: editTypeProduct
}