const models = require('../models');

// Async function to create a type of change
async function createTypeChange(req, res) {
    const typechange = {
        typechange: req.body.typechange
    };

    try {
        const existingType = await models.typechange.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typechange: req.body.typechange
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type change already exists"
            });
        } else {
            const result = await models.typechange.create(typechange);
            return res.status(200).json({
                message: "Type change created successfully",
                typechange: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to obtain all of the types of change
async function getAllTypes(req, res) {
    try {
        const types = await models.typechange.findAll();

        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }

        return res.status(200).json({
            message: "Type change found successfully",
            types: types
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to edit a type of change 
async function editTypeChange(req, res) {
    const idtypechange = req.params.idtypechange;
    const updatedTypeData = req.body;

    try {
        const typechange = await models.typechange.findByPk(idtypechange);

        if (!typechange) {
            return res.status(404).json({
                message: "Type change not found"
            });
        }

        const existingType = await models.typechange.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    typechange: updatedTypeData.typechange
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type change already exists"
            });
        }

        Object.assign(typechange, updatedTypeData);
        const updatedTypeDataResult = await typechange.save();
        return res.status(200).json({
            message: "Type change updated successfully",
            typechange: updatedTypeDataResult
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createTypeChange: createTypeChange,
    getAllTypes: getAllTypes,
    editTypeChange: editTypeChange
}