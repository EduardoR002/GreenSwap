const models = require('../models');

// Função para criar um tipo de notificação
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

// Função para obter todos os tipos de notificação
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

// Função para editar um tipo de notificação
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

        if (updatedTypeData.name !== typenotification.name) {
            const existingType = await models.typenotification.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                        name: updatedTypeData.name
                    }]
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
        } else {
            Object.assign(typenotification, updatedTypeData);
            const updatedTypeDataResult = await typenotification.save();
            return res.status(200).json({
                message: "Type notification updated successfully",
                typenotification: updatedTypeDataResult
            });
        }
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
