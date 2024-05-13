const models = require('../models');

// Function to create a new seller
function createSeller(req, res) {
    const { idrequest, idcertificate, userId } = req.body;

    // Check if any field is empty
    if (!idrequest || !idcertificate || !userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    const newSeller = {
        idrequest,
        idcertificate,
        userId
    };

    // Check if the referenced requestseller and certificate exist
    Promise.all([
        models.requestseller.findByPk(idrequest),
        models.certificate.findByPk(idcertificate)
    ])
        .then(([requestSeller, certificate]) => {
            if (!requestSeller || !certificate) {
                return res.status(404).json({
                    message: "Request Seller or Certificate not found"
                });
            }

            // Create the seller
            models.seller.create(newSeller)
                .then(createdSeller => {
                    res.status(200).json({
                        message: "Seller created successfully",
                        seller: createdSeller
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

// Function to get a single seller by their ID
function getSeller(req, res) {
    const sellerId = req.params.sellerId;

    models.seller.findByPk(sellerId)
        .then(seller => {
            if (!seller) {
                return res.status(404).json({
                    message: "Seller not found"
                });
            }
            res.status(200).json({
                message: "Seller found successfully",
                seller: seller
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to get all sellers
function getAllSellers(req, res) {
    models.seller.findAll()
        .then(sellers => {
            if (!sellers || sellers.length === 0) {
                return res.status(404).json({
                    message: "No sellers found"
                });
            }
            res.status(200).json({
                message: "Sellers found successfully",
                sellers: sellers
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to edit data of one seller
function editSeller(req, res){
    const sellerId = req.params.sellerId;
    const updatedSellerData = req.body;

    // Check if any field is empty
    if (!updatedSellerData.idrequest || !updatedSellerData.idcertificate || !updatedSellerData.userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    // Check if the referenced requestseller and certificate exist
    Promise.all([
        models.requestseller.findByPk(updatedSellerData.idrequest),
        models.certificate.findByPk(updatedSellerData.idcertificate)
    ])
        .then(([requestSeller, certificate]) => {
            if (!requestSeller || !certificate) {
                return res.status(404).json({
                    message: "Request Seller or Certificate not found"
                });
            }

            models.seller.findByPk(sellerId)
                .then(seller => {
                    if (!seller) {
                        return res.status(404).json({
                            message: "Seller not found"
                        });
                    }

                    // Check if any data is being updated
                    if (
                        updatedSellerData.idrequest !== seller.idrequest ||
                        updatedSellerData.idcertificate !== seller.idcertificate ||
                        updatedSellerData.userId !== seller.userId
                    ) {
                        // If so, update the seller
                        Object.assign(seller, updatedSellerData);
                        return seller.save()
                            .then(updatedSeller => {
                                res.status(200).json({
                                    message: "Seller updated successfully",
                                    seller: updatedSeller
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
                            message: "No changes detected, seller remains unchanged",
                            seller: seller
                        });
                    }
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

module.exports = {
    createSeller: createSeller,
    getSeller: getSeller,
    getAllSellers: getAllSellers,
    editSeller: editSeller
};
