const models = require('../models');

// Async function to create a new direct  proposal
async function createDirectProposal(req, res) {
    try {
        const { newprice, idproduct, iduser, quantity } = req.body;

        // Check if price and quantity is greater than zero
        if (newprice <= 0 || quantity <= 0) {
            return res.status(422).json({
                message: "Price or quantity must be greater than zero"
            });
        }
        const result = await models.sequelize.query(
            'CALL createDirectProposal(:in_newprice, :in_idproduct, :in_iduser, :in_quantity)',
            {
                replacements: { in_newprice: newprice, in_idproduct: idproduct, in_iduser: iduser, ind_quantity: quantity },
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        if (result && result.length > 0 && result[0].message === 'Proposal created successfully') {
            res.status(200).json({
                message: "Proposal created successfully"
            });
        } else {
            res.status(500).json({
                message: result[0] ? result[0].message : "Unknown error occurred"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function acceptProposal(req, res) {
    const proposalId = req.body;
    try {
        const proposal = await models.proposal.findByPk(proposalId);

        const proposalUpdated = proposal;

        Object.assign(proposal, proposalUpdated);
        const updatedproposal = await proposal.save();

        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid',
            {
                replacements: {in_date: new Date(), in_idtypenotification: 2, in_idpurchase: null, in_idproposal: updatedproposal.proposalId, in_idcertificate: null, in_idrequest: null, in_description: "Proposal accepted", in_for: "user", in_userid: proposal.iduser},
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        await models.sequelize.query(
            'CALL createDirectPurchase(:in_buydate, :in_quantity, :in_price, :in_idproduct, :in_iduser)',
            {
                replacements: { in_buydate: new Date(), in_quantity: proposal.quantity, in_price: proposal.newprice, in_idproduct: proposal.idproduct, in_iduser: proposal.iduser },
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({
            message: "Proposal accepted with success"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to create a new proposal
async function createProposal(req, res) {
    const { newprice, iduser, idproduct, idproposalstate, idproposaltype, quantity, futuredate, startday } = req.body;

    // Check if newprice is greater than 0
    if (newprice <= 0) {
        return res.status(422).json({
            message: "Price must be greater than zero"
        });
    }


    // Check if any field is empty
    if (!newprice || !iduser || !idproduct || !idproposalstate || !idproposaltype) {
        return res.status(422).json({
            message: "All fields are required"
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

    try {
        // Check if the referenced user, product, proposal state, and proposal type exist
        const [user, product, proposalState, proposalType] = await Promise.all([
            models.user.findByPk(iduser),
            models.product.findByPk(idproduct),
            models.proposalstate.findByPk(idproposalstate),
            models.proposaltype.findByPk(idproposaltype)
        ]);

        if (!user || !product || !proposalState || !proposalType) {
            return res.status(404).json({
                message: "User, Product, Proposal State, or Proposal Type not found"
            });
        }

        // Create the proposal
        const createdProposal = await models.proposal.create(newProposal);

        res.status(200).json({
            message: "Proposal created successfully",
            proposal: createdProposal
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Asynch function to get all proposals
async function getAllProposals(req, res) {
    try {
        const proposals = await models.proposal.findAll();
        if (!proposals || proposals.length === 0) {
            return res.status(404).json({
                message: "No proposals found"
            });
        }
        res.status(200).json({
            message: "Proposals found successfully",
            proposals: proposals
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function used to edit data of one proposal
async function editProposal(req, res) {
    const proposalId = req.params.proposalId;
    const updatedProposalData = req.body;

    // Check if any field is empty
    if (!updatedProposalData.newprice || !updatedProposalData.iduser || !updatedProposalData.idproduct || !updatedProposalData.idproposalstate || !updatedProposalData.idproposaltype) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        const proposal = await models.proposal.findByPk(proposalId);
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
            const updatedProposal = await proposal.save();
            res.status(200).json({
                message: "Proposal updated successfully",
                proposal: updatedProposal
            });
        } else {
            // If no data is being updated, return a success message
            res.status(200).json({
                message: "No changes detected, proposal remains unchanged",
                proposal: proposal
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    createDirectProposal: createDirectProposal,
    createProposal: createProposal,
    getAllProposals: getAllProposals,
    editProposal: editProposal,
    acceptProposal: acceptProposal
};