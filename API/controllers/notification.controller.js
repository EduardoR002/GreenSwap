const models = require('../models');

// Async function to create a new notification
async function createNotification(req, res) {
    const { date, idtypenotification, idpurchase, idproposal, idcertificate, idrequest } = req.body;

    // Check if any field is empty
    if (!date || !idtypenotification) {
        return res.status(422).json({
            message: "Date and Type Notification ID are required"
        });
    }

    try {
        // Check if the referenced type notification exists
        const typeNotification = await models.typenotification.findByPk(idtypenotification);
        if (!typeNotification) {
            return res.status(404).json({
                message: "Type Notification not found"
            });
        }

        // Check if the referenced IDs exist
        if (idpurchase) {
            const purchase = await models.purchase.findByPk(idpurchase);
            if (!purchase) {
                return res.status(404).json({
                    message: "Purchase not found"
                });
            }
        }

        if (idproposal) {
            const proposal = await models.proposal.findByPk(idproposal);
            if (!proposal) {
                return res.status(404).json({
                    message: "Proposal not found"
                });
            }
        }

        if (idcertificate) {
            const certificate = await models.certificate.findByPk(idcertificate);
            if (!certificate) {
                return res.status(404).json({
                    message: "Certificate not found"
                });
            }
        }

        if (idrequest) {
            const request = await models.requestseller.findByPk(idrequest);
            if (!request) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }
        }

        // Create the notification
        const newNotification = await models.notification.create({
            date,
            idtypenotification,
            idpurchase,
            idproposal,
            idcertificate,
            idrequest
        });

        res.status(200).json({
            message: "Notification created successfully",
            notification: newNotification
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


// Async function to get all notifications
async function getAllNotifications(req, res) {
    try {
        const notifications = await models.notification.findAll();
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                message: "No notifications found"
            });
        }
        res.status(200).json({
            message: "Notifications found successfully",
            notifications: notifications
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    createNotification: createNotification,
    getAllNotifications: getAllNotifications
};