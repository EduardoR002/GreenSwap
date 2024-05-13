const models = require('../models');

// Função para criar um tipo de proposta
async function createTypeProposal(req, res) {
    const proposalType = {
        proposaltype: req.body.proposaltype
    };

    try {
        const existingType = await models.proposaltype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    proposaltype: req.body.proposaltype
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type proposal already exists"
            });
        } else {
            const result = await models.proposaltype.create(proposalType);
            return res.status(200).json({
                message: "Type proposal created successfully",
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

// Função para obter todos os tipos de proposta
async function getAllTypes(req, res) {
    try {
        const types = await models.proposaltype.findAll();

        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }

        return res.status(200).json({
            message: "Type proposal found successfully",
            types: types
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Função para editar um tipo de proposta
async function editTypeProposal(req, res) {
    const idtype = req.params.idtype;
    const updatedTypeData = req.body;

    try {
        const type = await models.proposaltype.findByPk(idtype);

        if (!type) {
            return res.status(404).json({
                message: "Type proposal not found"
            });
        }

        const existingType = await models.proposaltype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    proposaltype: updatedTypeData.proposaltype
                }]
            }
        });

        if (existingType) {
            return res.status(409).json({
                message: "Type proposal already exists"
            });
        }

        Object.assign(type, updatedTypeData);
        const updatedTypeDataResult = await type.save();
        return res.status(200).json({
            message: "Type proposal updated successfully",
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
    createTypeProposal: createTypeProposal,
    getAllTypes: getAllTypes,
    editTypeProposal: editTypeProposal
}