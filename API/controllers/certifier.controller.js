const models = require('../models');

// Function that create a new certifier
function createCertifier(req, res) {
    const { name, email, password } = req.body;

    // Check if any field is empty
    if (!name || !email || !password) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    const certifier = {
        name,
        email,
        password,
    };

    // verify if email is unique
    models.certifier.findOne({
        where: {
            email
        }
    }).then(existingCertifier => {
        if (existingCertifier) {
            // If the email already exists, returns error 409
            return res.status(409).json({
                message: "Email already exists"
            });
        } else {
            // If the email is new in the database, then proceed to create a new Certifier
            models.certifier.create(certifier).then(result => {
                res.status(200).json({
                    message: "Certifier created successfully",
                    certifier: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


// Function used to get all data of one Certifier
function getCertifier(req, res){
    const idCertifier = req.params.certifierId;
    models.certifier.findOne({ where: { idCertifier: idCertifier } })
        .then(certifier => {
            if (!certifier) {
                return res.status(404).json({
                    message: "Certifier not found"
                });
            }
            
            res.status(200).json({
                message: "Certifier found successfully",
                certifier: certifier
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to get all certifiers data
function getAllCertifiers(req, res){
    models.certifier.findAll()
    .then(certifiers => {
        if(!certifiers || certifiers.length === 0) {
            return res.status(404).json({
                message: "No certifiers found"
            });
        }
        res.status(200).json({
            message: "certifiers found successfully",
            certifiers: certifiers
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function used to edit data from one certifier
function editCertifier(req, res) {
    const certifierId = req.params.certifierId;
    const updatedCertifierData = req.body;

    models.certifier.findByPk(certifierId)
    .then(certifier => {
        if (!certifier) {
            return res.status(404).json({
                message: "Certifier not found"
            });
        }

        // Check if email  is being updated
        if (
            updatedCertifierData.email !== certifier.email 
        ) {
            // If so, check if the new email  already exists
            models.certifier.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                            email: updatedCertifierData.email
                        }
                    ]
                }
            }).then(existingCertifier => {
                if (existingCertifier) {
                    if (existingCertifier.email === updatedCertifierData.email && existingCertifier.idcertifier !== certifierId) {
                        return res.status(409).json({
                            message: "Email already exists"
                        });
                    }
                }
                // If no conflict, update the certifier
                Object.assign(certifier, updatedCertifierData);
                return certifier.save();
            }).then(updatedCertifier => {
                res.status(200).json({
                    message: "Certifier updated successfully",
                    certifier: updatedCertifier
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        } else {
            // If email is not being updated, simply update the certifier
            Object.assign(certifier, updatedCertifierData);
            return certifier.save().then(updatedCertifier => {
                res.status(200).json({
                    message: "Certifier updated successfully",
                    certifier: updatedCertifier
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}



module.exports = {
    createCertifier: createCertifier,
    getCertifier: getCertifier,
    getAllCertifiers: getAllCertifiers,
    editCertifier: editCertifier
}