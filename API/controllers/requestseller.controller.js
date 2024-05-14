    const models = require('../models');

    // Asynchronous function to create a request to be a seller
    async function createRequestSeller(req, res) {
        const { nif, description, photo, idstate, iduser } = req.body;

        // Check if nif, idstate, and iduser are empty
        if (!nif || !description|| !idstate || !iduser) {
            return res.status(422).json({
                message: "Description, Nif, IdState, and IdUser are necessary"
            });
        }

        const newRequestSeller = {
            nif,
            description,
            photo,
            idstate,
            iduser
        };

        try {
            // Check if the user ID exists in the user table
            const user = await models.user.findByPk(iduser);
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Check if the request state ID exists in the requeststate table
            const requestState = await models.requeststate.findByPk(idstate);   
            if (!requestState) {
                return res.status(404).json({
                    message: "Request state not found"
                });
            }

            // Create the request seller
            const createdRequestSeller = await models.requestseller.create(newRequestSeller);
            res.status(200).json({
                message: "Request seller created successfully",
                requestSeller: createdRequestSeller
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message
            });
        }
    }

    // Asynchronous function to get all request sellers
    async function getAllRequestSellers(req, res) {
        try {
            const requestSellers = await models.requestseller.findAll();
            if (!requestSellers || requestSellers.length === 0) {
                return res.status(404).json({
                    message: "No request sellers found"
                });
            }
            res.status(200).json({
                message: "Request sellers found successfully",
                requestSellers: requestSellers
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message
            });
        }
    }

    // Asynchronous function to edit a request seller
    async function editRequestSeller(req, res) {
        const idrequestseller = req.params.idrequestseller;
        const updatedRequestData = req.body;
    
        try {
            // Find the request seller by ID
            const requestseller = await models.requestseller.findByPk(idrequestseller);
            if (!requestseller) {
                return res.status(404).json({
                    message: "Request seller not found"
                });
            }
            
            // Find the request state by ID
            const requestState = await models.requeststate.findByPk(updatedRequestData.idstate);
            if (!requestState) {
                return res.status(404).json({
                    message: "Request state not found"
                });
            }
            
            // Check if the request state is pending
            if (requestState.state !== 'pending') {
                return res.status(422).json({
                    message: "Cannot edit request seller. Request state is not pending."
                });
            }
    
            // Update the request seller
            Object.assign(requestseller, updatedRequestData);
            const updatedRequest = await requestseller.save();
    
            res.status(200).json({
                message: "Request seller updated successfully",
                requestSeller: updatedRequest
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message
            });
        }
    }
    module.exports = {
        createRequestSeller: createRequestSeller,
        getAllRequestSellers: getAllRequestSellers,
        editRequestSeller: editRequestSeller
    };
