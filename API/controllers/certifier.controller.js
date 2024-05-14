const models = require('../models');

// Function to create a new certifier
async function createCertifier(req, res) {
    const { name, email, password } = req.body;

    // Checks if any field is empty
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

    try {
        // Checks if the email is unique
        const existingCertifier = await models.certifier.findOne({
            where: {
                email
            }
        });

        if (existingCertifier) {
            // If the email already exists, return error 409
            return res.status(409).json({
                message: "Email already exists"
            });
        } else {
            // If the email is new in the database, proceed to create a new Certifier
            const result = await models.certifier.create(certifier);
            return res.status(200).json({
                message: "Certifier created successfully",
                certifier: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function to get all data of a Certifier
async function getCertifier(req, res) {
    const idCertifier = req.params.certifierId;
    try {
        const certifier = await models.certifier.findOne({ where: { idCertifier: idCertifier } });
        if (!certifier) {
            return res.status(404).json({
                message: "Certifier not found"
            });
        }
        
        return res.status(200).json({
            message: "Certifier found successfully",
            certifier: certifier
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function to get all data of certifiers
async function getAllCertifiers(req, res) {
    try {
        const certifiers = await models.certifier.findAll();
        if (!certifiers || certifiers.length === 0) {
            return res.status(404).json({
                message: "No certifiers found"
            });
        }
        return res.status(200).json({
            message: "Certifiers found successfully",
            certifiers: certifiers
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Function to edit data of a certifier
async function editCertifier(req, res) {
    const certifierId = req.params.certifierId;
    const updatedCertifierData = req.body;

    try {
        const certifier = await models.certifier.findByPk(certifierId);
        if (!certifier) {
            return res.status(404).json({
                message: "Certifier not found"
            });
        }

        // Checks if the email is being updated
        if (updatedCertifierData.email !== certifier.email) {
            // If yes, checks if the new email already exists
            const existingCertifier = await models.certifier.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                        email: updatedCertifierData.email
                    }]
                }
            });
            if (existingCertifier && existingCertifier.idcertifier !== certifierId) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
        }
        // If there is no conflict, update the certifier
        Object.assign(certifier, updatedCertifierData);
        const updatedCertifier = await certifier.save();
        return res.status(200).json({
            message: "Certifier updated successfully",
            certifier: updatedCertifier
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createCertifier: createCertifier,
    getCertifier: getCertifier,
    getAllCertifiers: getAllCertifiers,
    editCertifier: editCertifier
}