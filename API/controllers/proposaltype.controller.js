const models = require('../models');

// Function to create a type proposal
function createTypeProposal(req, res){
    const proposalType = {
        proposaltype: req.body.proposaltype
    }

    models.proposaltype.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                proposaltype: req.body.proposaltype
            }]
        }
    }).then(existingType => {
        if (existingType) {
            if (existingType.proposaltype === req.body.proposaltype) {
                return res.status(409).json({
                    message: "Type proposal already exists"
                });
            }
        } else {
            models.proposaltype.create(proposalType)
            .then(result => {
                res.status(200).json({
                    message: "Type proposal created successfully",
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

// Function to get all type proposals
function getAllTypes(req, res){
    models.proposaltype.findAll()
    .then(types => {
        if (!types || types.length === 0) {
            return res.status(404).json({
                message: "No types found"
            });
        }
        res.status(200).json({
            message: "Type proposal found successfully",
            types: types
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to edit a type proposal
function editTypeProposal(req, res){
    const idtype = req.params.idtype;
    const updatedTypeData = req.body;

    models.proposaltype.findByPk(idtype)
    .then(type => {
        if (!type) {
            return res.status(404).json({
                message: "Type proposal not found"
            });
        }
        models.proposaltype.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    type: updatedTypeData.type
                }]
            }
        }).then(existingType => {
            if (existingType) {
                return res.status(409).json({
                    message: "Type proposal already exists"
                });
            }
            Object.assign(type, updatedTypeData);
            return type.save();
        }).then(updatedTypeData => {
            res.status(200).json({
                message: "Type proposal updated successfully",
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
    createTypeProposal: createTypeProposal,
    getAllTypes: getAllTypes,
    editTypeProposal: editTypeProposal
}