const models = require('../models');

// Async function to create a type of notificarion
async function createTypeNotification(req, res) {
    const typenotification = {
        name: req.body.name,
        description: req.body.description
    };

    try {
        const existingType = await models.typenotification.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    name: req.body.name
                }]
            }
        });

        if (existingType) {
            return res.status(400).json({
                message: "Type notification name already exists"
            });
        } else {
            const result = await models.typenotification.create(typenotification);
            return res.status(200).json({
                message: "Type notification created successfully",
                typenotification: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function that obtains all types of notifications
async function getAllTypes(req, res) {
    try {
        const types = await models.typenotification.findAll();

        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }

        return res.status(200).json({
            message: "Type notifications found successfully",
            types: types
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to edit type notification
async function editTypeNotification(req, res) {
    const idtypenotification = req.params.idtypenotification;
    const updatedTypeData = req.body;

    try {
        const typenotification = await models.typenotification.findByPk(idtypenotification);

        if (!typenotification) {
            return res.status(404).json({
                message: "Type notification not found"
            });
        }

        const existingType = await models.typenotification.findOne({
            where: {
                [models.Sequelize.Op.and]: [
                    { name: updatedTypeData.name },
                    { id: { [models.Sequelize.Op.ne]: idtypenotification } }
                ]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type notification name already exists"
            });
        }

        Object.assign(typenotification, updatedTypeData);
        const updatedTypeDataResult = await typenotification.save();
        return res.status(200).json({
            message: "Type notification updated successfully",
            typenotification: updatedTypeDataResult
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createTypeNotification: createTypeNotification,
    getAllTypes: getAllTypes,
    editTypeNotification: editTypeNotification
};
