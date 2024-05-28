const models = require('../models');

// Async function to create a request state
async function createRequestState(req, res) {
    const requestState = {
        state: req.body.state
    };

    try {
        const existingState = await models.requeststate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: req.body.state
                }]
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Request state already exists"
            });
        } else {
            const result = await models.requeststate.create(requestState);
            return res.status(200).json({
                message: "Request state created successfully",
                state: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to obtain all of the request states 
async function getAllRequestStates(req, res) {
    try {
        const states = await models.requeststate.findAll();

        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No request states found"
            });
        }

        return res.status(200).json({
            message: "Request states found successfully",
            states: states
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to edit a request state 
async function editRequestState(req, res) {
    const idState = req.params.idState;
    const updatedStateData = req.body;

    try {
        const state = await models.requeststate.findByPk(idState);

        if (!state) {
            return res.status(404).json({
                message: "Request state not found"
            });
        }

        const existingState = await models.requeststate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: updatedStateData.state
                }]
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Request state already exists"
            });
        }

        Object.assign(state, updatedStateData);
        const updatedStateDataResult = await state.save();
        return res.status(200).json({
            message: "Request state updated successfully",
            state: updatedStateDataResult
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createRequestState: createRequestState,
    getAllRequestStates: getAllRequestStates,
    editRequestState: editRequestState
}
