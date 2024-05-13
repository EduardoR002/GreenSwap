const models = require('../models');

// Function  to create a new seller
async function createSeller(req, res) {
    const { idrequest, idcertificate, userId } = req.body;

    // Check if any field is empty
    if (!idrequest || !idcertificate || !userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        // Check if the request seller and the certificate exist
        const [requestSeller, certificate] = await Promise.all([
            models.requestseller.findByPk(idrequest),
            models.certificate.findByPk(idcertificate)
        ]);

        if (!requestSeller || !certificate) {
            return res.status(404).json({
                message: "Request Seller or Certificate not found"
            });
        }

        // Cria o vendedor
        const createdSeller = await models.seller.create({
            idrequest,
            idcertificate,
            userId
        });

        res.status(200).json({
            message: "Seller created successfully",
            seller: createdSeller
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Function to get a single seller by their ID
async function getSeller(req, res) {
    const sellerId = req.params.sellerId;

    try {
        const seller = await models.seller.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found"
            });
        }
        res.status(200).json({
            message: "Seller found successfully",
            seller: seller
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

/// Function  to get all sellers
async function getAllSellers(req, res) {
    try {
        const sellers = await models.seller.findAll();
        if (!sellers || sellers.length === 0) {
            return res.status(404).json({
                message: "No sellers found"
            });
        }
        res.status(200).json({
            message: "Sellers found successfully",
            sellers: sellers
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Function to edit seller data
async function editSeller(req, res) {
    const sellerId = req.params.sellerId;
    const updatedSellerData = req.body;

    // Check if any field is empty
    if (!updatedSellerData.idrequest || !updatedSellerData.idcertificate || !updatedSellerData.userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
         // Check if the request seller and the certificate exist
        const [requestSeller, certificate] = await Promise.all([
            models.requestseller.findByPk(updatedSellerData.idrequest),
            models.certificate.findByPk(updatedSellerData.idcertificate)
        ]);

        const seller = await models.seller.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found"
            });
        }

        if (!requestSeller || !certificate) {
            return res.status(404).json({
                message: "Request Seller or Certificate not found"
            });
        }

        // Check if any data is being updated
        if (
            updatedSellerData.idrequest !== seller.idrequest ||
            updatedSellerData.idcertificate !== seller.idcertificate ||
            updatedSellerData.userId !== seller.userId
        ) {
             // If yes, update the seller
            Object.assign(seller, updatedSellerData);
            const updatedSeller = await seller.save();
            res.status(200).json({
                message: "Seller updated successfully",
                seller: updatedSeller
            });
        } else {
            // If no data is being updated, return a success message
            res.status(200).json({
                message: "No changes detected, seller remains unchanged",
                seller: seller
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
    createSeller: createSeller,
    getSeller: getSeller,
    getAllSellers: getAllSellers,
    editSeller: editSeller
};