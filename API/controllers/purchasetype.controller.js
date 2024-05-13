const models = require('../models');

// Função para criar um tipo de compra
async function createTypePurchase(req, res) {
    const purchaseType = {
        type: req.body.type
    };

    try {
        const existingType = await models.purchasetype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    type: req.body.type
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type purchase already exists"
            });
        } else {
            const result = await models.purchasetype.create(purchaseType);
            return res.status(200).json({
                message: "Type purchase created successfully",
                type: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Função para obter todos os tipos de compra
async function getAllTypes(req, res) {
    try {
        const types = await models.purchasetype.findAll();

        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }

        return res.status(200).json({
            message: "Type purchases found successfully",
            types: types
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Função para editar um tipo de compra
async function editTypePurchase(req, res) {
    const idtype = req.params.idtype;
    const updatedTypeData = req.body;

    try {
        const type = await models.purchasetype.findByPk(idtype);

        if (!type) {
            return res.status(404).json({
                message: "Type purchase not found"
            });
        }

        const existingType = await models.purchasetype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    type: updatedTypeData.type
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type purchase already exists"
            });
        }

        Object.assign(type, updatedTypeData);
        const updatedTypeDataResult = await type.save();
        return res.status(200).json({
            message: "Type purchase updated successfully",
            type: updatedTypeDataResult
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createTypePurchase: createTypePurchase,
    getAllTypes: getAllTypes,
    editTypePurchase: editTypePurchase
}