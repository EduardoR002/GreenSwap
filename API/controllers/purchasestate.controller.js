const models = require('../models');

// Async function to create a purchase status 
async function createPurchaseState(req, res) {
    const purchaseState = {
        state: req.body.state
    };

    try {
        const existingState = await models.purchasestate.findOne({
            where: {
                state: req.body.state
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Purchase state already exists"
            });
        } else {
            const result = await models.purchasestate.create(purchaseState);
            res.status(200).json({
                message: "Purchase state created successfully",
                state: result
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to obtain all of the purchase status 
async function getAllPurchaseStates(req, res) {
    try {
        const states = await models.purchasestate.findAll();
        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No purchase states found"
            });
        }
        res.status(200).json({
            message: "Purchase states found successfully",
            states: states
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to edit a purchase status 
async function editPurchaseState(req, res) {
    const idState = req.params.idState;
    const updatedStateData = req.body;

    try {
        const state = await models.purchasestate.findByPk(idState);
        if (!state) {
            return res.status(404).json({
                message: "Purchase state not found"
            });
        }

        const existingState = await models.purchasestate.findOne({
            where: {
                state: updatedStateData.state
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Purchase state already exists"
            });
        }

        Object.assign(state, updatedStateData);
        const updatedState = await state.save();
        
        res.status(200).json({
            message: "Purchase state updated successfully",
            state: updatedState
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


module.exports = {
    createPurchaseState: createPurchaseState,
    getAllPurchaseStates: getAllPurchaseStates,
    editPurchaseState: editPurchaseState
}
