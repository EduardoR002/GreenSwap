const models = require('../models');

// Async function to create a proposal state
async function createProposalState(req, res) {
    const proposalState = {
        state: req.body.state
    };

    try {
        const existingState = await models.proposalstate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: req.body.state
                }]
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Proposal state already exists"
            });
        } else {
            const result = await models.proposalstate.create(proposalState);
            return res.status(200).json({
                message: "Proposal state created successfully",
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

// Async function to obtain all the proposal states
async function getAllStates(req, res) {
    try {
        const states = await models.proposalstate.findAll();

        if (!states || states.length === 0) {
            return res.status(404).json({
                message: "No states found"
            });
        }

        return res.status(200).json({
            message: "Proposal states found successfully",
            states: states
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Async function to edit a proposal state
async function editProposalState(req, res) {
    const idState = req.params.idState;
    const updatedStateData = req.body;

    try {
        const state = await models.proposalstate.findByPk(idState);

        if (!state) {
            return res.status(404).json({
                message: "Proposal state not found"
            });
        }

        const existingState = await models.proposalstate.findOne({
            where: {
                [models.Sequelize.Op.or]: [{
                    state: updatedStateData.state
                }]
            }
        });

        if (existingState) {
            return res.status(409).json({
                message: "Proposal state already exists"
            });
        }

        Object.assign(state, updatedStateData);
        const updatedStateDataResult = await state.save();
        return res.status(200).json({
            message: "Proposal state updated successfully",
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
    createProposalState: createProposalState,
    getAllStates: getAllStates,
    editProposalState: editProposalState
}
