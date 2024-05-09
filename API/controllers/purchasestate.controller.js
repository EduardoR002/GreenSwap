const models = require('../models');

// Função para criar um estado de compra
function createPurchaseState(req, res){
    const purchaseState = {
        state: req.body.state
    }

    models.purchasestate.findOne({
        where: {
            [models.Sequelize.Op.or]: [{
                state: req.body.state
            }]
        }
    }).then(existingState => {
        if (existingState) {
            return res.status(409).json({
                message: "Purchase state already exists"
            });
        } else {
            models.purchasestate.create(purchaseState)
            .then(result => {
                res.status(200).json({
                    message: "Purchase state created successfully",
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

// Função para obter todos os estados de compra
function getAllPurchaseStates(req, res){
    models.purchasestate.findAll()
    .then(states => {
        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No purchase states found"
            });
        }
        res.status(200).json({
            message: "Purchase states found successfully",
            states: states
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Função para editar um estado de compra
function editPurchaseState(req, res){
    const idState = req.params.idState;
    const updatedStateData = req.body;

    models.purchasestate.findByPk(idState)
    .then(state => {
        if (!state) {
            return res.status(404).json({
                message: "Purchase state not found"
            });
        }
        models.purchasestate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: updatedStateData.state
                }]
            }
        }).then(existingState => {
            if (existingState) {
                return res.status(409).json({
                    message: "Purchase state already exists"
                });
            }
            Object.assign(state, updatedStateData);
            return state.save();
        }).then(updatedStateData => {
            res.status(200).json({
                message: "Purchase state updated successfully",
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
    createPurchaseState: createPurchaseState,
    getAllPurchaseStates: getAllPurchaseStates,
    editPurchaseState: editPurchaseState
}
