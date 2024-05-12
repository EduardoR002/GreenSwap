const models = require('../models');


// Function used to create a new certificate
function createCertificate(req, res) {
    const { certificate, idcertifier } = req.body;

    // Check if any field is empty
    if (!certificate || !idcertifier) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    // Check if the idcertifier exists in the certifier table
    models.certifier.findByPk(idcertifier)
        .then(certifier => {
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
            models.certificate.create(newCertificate)
                .then(createdCertificate => {
                    res.status(200).json({
                        message: "Certificate created successfully",
                        certificate: createdCertificate
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

// Function used to get all certificates data
function getAllCertificates(req, res) {
    models.certificate.findAll()
        .then(certificates => {
            if (!certificates || certificates.length === 0) {
                return res.status(404).json({
                    message: "No certificates found"
                });
            }
            res.status(200).json({
                message: "Certificates found successfully",
                certificates: certificates
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
    createCertificate: createCertificate,
    getAllCertificates: getAllCertificates,
};