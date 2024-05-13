const models = require('../models');

// Function to create a new proposal
function createProposal(req, res) {
    const { newprice, iduser, idproduct, idproposalstate, idproposaltype, quantity, futuredate, startday } = req.body;

    // Check if any field is empty
    if (!newprice || !iduser || !idproduct || !idproposalstate || !idproposaltype) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    //check if newprice is greter than 0
    if(newprice <= 0){
        return res.status(422).json({
            message: "Price must be greater than zero"
        });
    }

    const newProposal = {
        newprice,
        iduser,
        idproduct,
        idproposalstate,
        idproposaltype,
        quantity,
        futuredate,
        startday
    };

    // Check if the referenced user, product, proposal state, and proposal type exist
    Promise.all([
        models.user.findByPk(iduser),
        models.product.findByPk(idproduct),
        models.proposalstate.findByPk(idproposalstate),
        models.proposaltype.findByPk(idproposaltype)
    ])
        .then(([user, product, proposalState, proposalType]) => {
            if (!user || !product || !proposalState || !proposalType) {
                return res.status(404).json({
                    message: "User, Product, Proposal State, or Proposal Type not found"
                });
            }

            // Create the proposal
            models.proposal.create(newProposal)
                .then(createdProposal => {
                    res.status(200).json({
                        message: "Proposal created successfully",
                        proposal: createdProposal
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to get all proposals
function getAllProposals(req, res) {
    models.proposal.findAll()
        .then(proposals => {
            if (!proposals || proposals.length === 0) {
                return res.status(404).json({
                    message: "No proposals found"
                });
            }
            res.status(200).json({
                message: "Proposals found successfully",
                proposals: proposals
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to edit data of one proposal
function editProposal(req, res){
    const proposalId = req.params.proposalId;
    const updatedProposalData = req.body;

    // Check if any field is empty
    if (!updatedProposalData.newprice || !updatedProposalData.iduser || !updatedProposalData.idproduct || !updatedProposalData.idproposalstate || !updatedProposalData.idproposaltype) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    models.proposal.findByPk(proposalId)
        .then(proposal => {
            if (!proposal) {
                return res.status(404).json({
                    message: "Proposal not found"
                });
            }

            // Check if any data is being updated
            if (
                updatedProposalData.newprice !== proposal.newprice ||
                updatedProposalData.iduser !== proposal.iduser ||
                updatedProposalData.idproduct !== proposal.idproduct ||
                updatedProposalData.idproposalstate !== proposal.idproposalstate ||
                updatedProposalData.idproposaltype !== proposal.idproposaltype ||
                updatedProposalData.quantity !== proposal.quantity ||
                updatedProposalData.futuredate !== proposal.futuredate ||
                updatedProposalData.startday !== proposal.startday
            ) {
                // If so, update the proposal
                Object.assign(proposal, updatedProposalData);
                return proposal.save()
                    .then(updatedProposal => {
                        res.status(200).json({
                            message: "Proposal updated successfully",
                            proposal: updatedProposal
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        });
                    });
            } else {
                // If no data is being updated, return a success message
                res.status(200).json({
                    message: "No changes detected, proposal remains unchanged",
                    proposal: proposal
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    createProposal: createProposal,
    getAllProposals: getAllProposals,
    editProposal: editProposal
}