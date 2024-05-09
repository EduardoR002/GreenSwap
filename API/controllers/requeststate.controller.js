const models = require('../models');

// Função para criar um estado de solicitação
function createRequestState(req, res){
    const requestState = {
        state: req.body.state
    }

    models.requeststate.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                state: req.body.state
            }]
        }
    }).then(existingState => {
        if (existingState) {
            return res.status(409).json({
                message: "Request state already exists"
            });
        } else {
            models.requeststate.create(requestState)
            .then(result => {
                res.status(200).json({
                    message: "Request state created successfully",
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

// Função para obter todos os estados de solicitação
function getAllRequestStates(req, res){
    models.requeststate.findAll()
    .then(states => {
        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No request states found"
            });
        }
        res.status(200).json({
            message: "Request states found successfully",
            states: states
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Função para editar um estado de solicitação
function editRequestState(req, res){
    const idState = req.params.idState;
    const updatedStateData = req.body;

    models.requeststate.findByPk(idState)
    .then(state => {
        if (!state) {
            return res.status(404).json({
                message: "Request state not found"
            });
        }
        models.requeststate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: updatedStateData.state
                }]
            }
        }).then(existingState => {
            if (existingState) {
                return res.status(409).json({
                    message: "Request state already exists"
                });
            }
            Object.assign(state, updatedStateData);
            return state.save();
        }).then(updatedStateData => {
            res.status(200).json({
                message: "Request state updated successfully",
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
    createRequestState: createRequestState,
    getAllRequestStates: getAllRequestStates,
    editRequestState: editRequestState
}
