const models = require('../models');

// Função para criar um tipo de produto
async function createTypeProduct(req, res) {
    const typeproduct = {
        typeproduct: req.body.typeproduct
    };

    try {
        const existingType = await models.typeproduct.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typeproduct: req.body.typeproduct
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type product already exists"
            });
        } else {
            const result = await models.typeproduct.create(typeproduct);
            return res.status(200).json({
                message: "Type product created successfully",
                typeproduct: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Função para obter todos os tipos de produtos
async function getAllTypes(req, res) {
    try {
        const types = await models.typeproduct.findAll();

        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }

        return res.status(200).json({
            message: "Type products found successfully",
            types: types
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Função para editar um tipo de produto
async function editTypeProduct(req, res) {
    const idtypeproduct = req.params.idtypeproduct;
    const updatedTypeData = req.body;

    try {
        const typeproduct = await models.typeproduct.findByPk(idtypeproduct);

        if (!typeproduct) {
            return res.status(404).json({
                message: "Type product not found"
            });
        }

        const existingType = await models.typeproduct.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typeproduct: updatedTypeData.typeproduct
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type product already exists"
            });
        }

        Object.assign(typeproduct, updatedTypeData);
        const updatedTypeDataResult = await typeproduct.save();

        return res.status(200).json({
            message: "Type product updated successfully",
            typeproduct: updatedTypeDataResult
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createTypeProduct: createTypeProduct,
    getAllTypes: getAllTypes,
    editTypeProduct: editTypeProduct
};