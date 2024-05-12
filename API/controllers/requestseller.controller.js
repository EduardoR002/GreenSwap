const models = require('../models');

// Function used to create a request to be a seller
function createRequestSeller(req, res) {
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

    // Check if the user ID exists in the user table
    models.user.findByPk(iduser)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            
            // Check if the request state ID exists in the requeststate table
            models.requeststate.findByPk(idstate)
                .then(requestState => {
                    if (!requestState) {
                        return res.status(404).json({
                            message: "Request state not found"
                        });
                    }

                    // Create the request seller
                    models.requestseller.create(newRequestSeller)
                        .then(createdRequestSeller => {
                            res.status(200).json({
                                message: "Request seller created successfully",
                                requestSeller: createdRequestSeller
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
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to get all requests
function getAllRequestSellers(req, res) {
    models.requestseller.findAll()
        .then(requestSellers => {
            if (!requestSellers || requestSellers.length === 0) {
                return res.status(404).json({
                    message: "No request sellers found"
                });
            }
            res.status(200).json({
                message: "Request sellers found successfully",
                requestSellers: requestSellers
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    createRequestSeller,
    getAllRequestSellers
};
