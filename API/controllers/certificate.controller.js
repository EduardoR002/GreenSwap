const models = require('../models');

// Function used to create a new certificate
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

// Function used to get all certificates data
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


module.exports = {
    createCertificate: createCertificate,
    getAllCertificates: getAllCertificates
};