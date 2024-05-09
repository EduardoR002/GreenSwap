const models = require('../models');

// Função para criar um estado de proposta
function createProposalState(req, res){
    const proposalState = {
        state: req.body.state
    }

    models.proposalstate.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                state: req.body.state
            }]
        }
    }).then(existingState => {
        if (existingState) {
            return res.status(409).json({
                message: "Proposal state already exists"
            });
        } else {
            models.proposalstate.create(proposalState)
            .then(result => {
                res.status(200).json({
                    message: "Proposal state created successfully",
                    state: result
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

// Função para obter todos os estados de propostas
function getAllStates(req, res){
    models.proposalstate.findAll()
    .then(states => {
        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No states found"
            });
        }
        res.status(200).json({
            message: "Proposal states found successfully",
            states: states
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Função para editar um estado de proposta
function editProposalState(req, res){
    const idState = req.params.idState;
    const updatedStateData = req.body;

    models.proposalstate.findByPk(idState)
    .then(state => {
        if (!state) {
            return res.status(404).json({
                message: "Proposal state not found"
            });
        }
        models.proposalstate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: updatedStateData.state
                }]
            }
        }).then(existingState => {
            if (existingState) {
                return res.status(409).json({
                    message: "Proposal state already exists"
                });
            }
            Object.assign(state, updatedStateData);
            return state.save();
        }).then(updatedStateData => {
            res.status(200).json({
                message: "Proposal state updated successfully",
                state: updatedStateData
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
    createProposalState: createProposalState,
    getAllStates: getAllStates,
    editProposalState: editProposalState
}
