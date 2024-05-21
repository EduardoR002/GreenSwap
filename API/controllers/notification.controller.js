const models = require('../models');

// Função assíncrona para criar uma nova notificação
async function createNotification(req, res) {
    const { date, idtypenotification, idpurchase, idproposal, idcertificate, idrequest, description, for_field, userId } = req.body;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!date || !idtypenotification || !description || !for_field || !userId) {
        return res.status(422).json({
            message: "Date, Type Notification ID, Description, For Field, and User ID are required"
        });
    }

    try {
        // Verifica se a notificação de tipo referenciada existe
        const typeNotification = await models.typenotification.findByPk(idtypenotification);
        if (!typeNotification) {
            return res.status(404).json({
                message: "Type Notification not found"
            });
        }

        // Verifica se os IDs referenciados existem
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

        // Verifica se o usuário referenciado existe
        const user = await models.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Cria a notificação
        const newNotification = await models.notification.create({
            date,
            idtypenotification,
            idpurchase,
            idproposal,
            idcertificate,
            idrequest,
            description,
            for_field,
            userId
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