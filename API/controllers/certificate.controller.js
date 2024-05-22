const models = require('../models');

// Async function used to create a new certificate
async function createCertificate(req, res) {
    const { certificate, idcertifier } = req.body;

    // Check if any field is empty
    if (!certificate || !idcertifier) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        // Check if the idcertifier exists in the certifier table
        const certifier = await models.certifier.findByPk(idcertifier);
        if (!certifier) {
            return res.status(404).json({
                message: "Certifier not found"
            });
        }

        // Certifier exists, proceed to create the certificate
        const newCertificate = {
            certificate,
            idcertifier
        };

        // Create the certificate
        const createdCertificate = await models.certificate.create(newCertificate);
        return res.status(200).json({
            message: "Certificate created successfully",
            certificate: createdCertificate
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function used to get all certificates data
async function getAllCertificates(req, res) {
    try {
        const certificates = await models.certificate.findAll();
        if (!certificates || certificates.length === 0) {
            return res.status(404).json({
                message: "No certificates found"
            });
        }
        return res.status(200).json({
            message: "Certificates found successfully",
            certificates: certificates
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function used to accept a seller certification request
async function acceptSellerRequest(req, res) {
    const { idrequestseller } = req.body;
    try {
        // Find the request by its ID
        const request = await models.requestseller.findByPk(idrequestseller);

        // Check if the request exists
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Check if the user associated with the request exists
        const user = await models.user.findByPk(request.userId);
        if (!user) {
            // If the user doesn't exist, change the request's state to "refused"
            request.idstate = 3;
            await request.save();
            return res.status(400).json({ message: "User not found. Request automatically refused." });
        }

        // Check if the request's state is "pending"
        if (request.idstate !== 1) {
            return res.status(400).json({ message: "Request is not in pending state" });
        }

        // Update the request's state to "accepted"
        request.idstate = 2;

        // Save the updated request
        await request.save();

        // Create an acceptance notification
        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_iduser)',
            {
                replacements: { in_date: new Date(), in_idtypenotification: 4, in_idpurchase: null, in_idproposal: null, in_idcertificate: null, in_idrequest: idrequestseller, in_description: "Request to be a seller accepted", in_for: "user", in_userid: request.userId },
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        // Send success response
        return res.status(200).json({ message: "Seller certification request accepted successfully" });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

// Async function used to refuse a seller certification request
async function refuseSellerRequest(req, res) {
    const { idrequestseller } = req.body;
    try {
        // Find the request by its ID
        const request = await models.requestseller.findByPk(idrequestseller);

        // Check if the request exists
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Check if the request's state is "pending"
        if (request.idstate !== 1) { 
            return res.status(400).json({ message: "Request is not in pending state" });
        }

        // Update the request's state to "refused"
        request.idstate = 3; 

        // Save the updated request
        await request.save();

        // Check if user ID exists in the users table
        const user = await models.user.findByPk(request.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Create a refusal notification
        await models.sequelize.query(
            'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid)',
            {
                replacements: { in_date: new Date(), in_idtypenotification: 4, in_idpurchase: null, in_idproposal: null, in_idcertificate: null, in_idrequest: idrequestseller, in_description: "Request to be a seller cancelled", in_for: "user", in_userid: request.userId },
                type: models.sequelize.QueryTypes.INSERT
            }
        );

        // Send success response
        return res.status(200).json({ message: "Seller certification request refused successfully" });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


module.exports = {
    createCertificate: createCertificate,
    getAllCertificates: getAllCertificates,
    acceptSellerRequest: acceptSellerRequest,
    refuseSellerRequest: refuseSellerRequest
};