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
                replacements: { in_newprice: newprice, in_idproduct: idproduct, in_iduser: iduser, in_quantity: quantity },
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        if (!result) {
            res.status(500).json({
                message: result[0] ? result[0].message : "Unknown error occurred"
            });
            
        } else {
            res.status(200).json({
                message: "Proposal created successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function createFutureProposal (req, res) {
    try {
        const { newprice, idproduct, iduser, quantity, futurepurchase } = req.body;

        // Check if price and quantity is greater than zero
        if (newprice <= 0 || quantity <= 0) {
            return res.status(422).json({
                message: "Price or quantity must be greater than zero"
            });
        }

        const result = await models.sequelize.query(
            'CALL createFutureProposal(:in_newprice, :in_idproduct, :in_iduser, :in_quantity, :in_futurepurchase)',
            {
                replacements: { in_newprice: newprice, in_idproduct: idproduct, in_iduser: iduser, in_quantity: quantity, in_futurepurchase: futurepurchase},
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        console.log(result);

        if (!result) {
            res.status(500).json({
                message: result[0] ? result[0].message : "Unknown error occurred"
            });
            
        } else {
            res.status(200).json({
                message: "Proposal created successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function createPeriodicProposal (req, res) {
    try {
        const { newprice, idproduct, iduser, quantity, startday } = req.body;

        // Check if price and quantity is greater than zero
        if (newprice <= 0 || quantity <= 0) {
            return res.status(422).json({
                message: "Price or quantity must be greater than zero"
            });
        }

        const result = await models.sequelize.query(
            'CALL createPeriodicProposal(:in_newprice, :in_idproduct, :in_iduser, :in_quantity, :in_startday)',
            {
                replacements: { in_newprice: newprice, in_idproduct: idproduct, in_iduser: iduser, in_quantity: quantity, in_startday: startday},
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        if (!result) {
            res.status(500).json({
                message: result[0] ? result[0].message : "Unknown error occurred"
            });
            
        } else {
            res.status(200).json({
                message: "Proposal created successfully"
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
    const { idproposal, type } = req.body;
    try {
        const proposal = await models.proposal.findByPk(idproposal);

        const proposalUpdated = proposal;

        proposalUpdated.idproposalstate = 2;

        Object.assign(proposal, proposalUpdated);
        const updatedproposal = await proposal.save();

        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid)',
            {
                replacements: {in_date: new Date(), in_idtypenotification: 2, in_idpurchase: null, in_idproposal: updatedproposal.idproposal, in_idcertificate: null, in_idrequest: null, in_description: "Proposal accepted", in_for: "user", in_userid: proposal.iduser},
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        if (type === 'direct') {
            await models.sequelize.query(
                'CALL directProposaltoPurchase(:in_buydate, :in_quantity, :in_price, :in_idproduct, :in_iduser)',
                {
                    replacements: {in_buydate: new Date(), in_quantity: proposal.quantity, in_price: proposal.newprice, in_idproduct: proposal.idproduct, in_iduser: proposal.iduser },
                    type: models.sequelize.QueryTypes.SELECT
                }
            );
        }
        else if (type === 'future') {
            await models.sequelize.query(
                'CALL createFuturePurchase(:in_buydate, :in_quantity, :in_price, :in_futurepurchase, :in_idproduct, :in_iduser)',
                {
                    replacements: {in_buydate: new Date(), in_quantity: proposal.quantity, in_price: proposal.newprice, in_futurepurchase: proposal.futuredate, in_idproduct: proposal.idproduct, in_iduser: proposal.iduser },
                    type: models.sequelize.QueryTypes.SELECT
                }
            );  
        }
        else if (type === 'periodic') {
            await models.sequelize.query(
                'CALL createPeriodicPurchase(:in_buydate, :in_quantity, :in_price, :in_idproduct, :in_iduser, :in_startday)',
                {
                    replacements: {in_buydate: new Date(), in_quantity: proposal.quantity, in_price: proposal.newprice, in_idproduct: proposal.idproduct, in_iduser: proposal.iduser, in_startday: proposal.startday},
                    type: models.sequelize.QueryTypes.SELECT
                }
            );  
        }
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

async function refuseProposal(req, res) {
    const { idproposal } = req.body;
    try {
        const proposal = await models.proposal.findByPk(idproposal);

        const proposalUpdated = proposal;

        proposalUpdated.idproposalstate = 3;

        Object.assign(proposal, proposalUpdated);
        const updatedproposal = await proposal.save();

        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid)',
            {
                replacements: {in_date: new Date(), in_idtypenotification: 2, in_idpurchase: null, in_idproposal: updatedproposal.idproposal, in_idcertificate: null, in_idrequest: null, in_description: "Proposal refused", in_for: "user", in_userid: proposal.iduser},
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        res.status(200).json({
            message: "Proposal refused with success"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function used to cancel a proposal
async function cancelProposal(req, res) {
    const { idproposal } = req.body; 
    try {
        // Find the proposal by its ID
        const proposal = await models.proposal.findByPk(idproposal);

        // Check if the proposal exists
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }

        // Check if the proposal's state is "pending"
        if (proposal.idproposalstate !== 1) { // Assuming 1 is the ID for "pending" state
            return res.status(400).json({ message: "Proposal is not in pending state" });
        }

        // Update the proposal's state to "cancelled"
        proposal.idproposalstate = 4; // Assuming 4 is the ID for "cancelled" state

        // Save the updated proposal
        await proposal.save();

        // Create a cancellation notification
        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid)',
            {
                replacements: {in_date: new Date(), in_idtypenotification: 2, in_idpurchase: null, in_idproposal: proposal.idproposal, in_idcertificate: null, in_idrequest: null, in_description: "Proposal cancelled", in_for: "user", in_userid: proposal.iduser},
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        // Send success response
        return res.status(200).json({ message: "Proposal cancelled successfully" });
        
    } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: "Something went wrong", error: error.message });
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
    const idproposal = req.params.idproposal;
    const updatedProposalData = req.body;

    // Check if any field is empty
    if (!updatedProposalData.newprice || !updatedProposalData.iduser || !updatedProposalData.idproduct || !updatedProposalData.idproposalstate || !updatedProposalData.idproposaltype) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        const proposal = await models.proposal.findByPk(idproposal);
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
    getAllProposals: getAllProposals,
    editProposal: editProposal,
    acceptProposal: acceptProposal,
    refuseProposal: refuseProposal,
    cancelProposal: cancelProposal,
    createFutureProposal: createFutureProposal,
    createPeriodicProposal: createPeriodicProposal
};