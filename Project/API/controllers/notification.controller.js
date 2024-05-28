const models = require('../models');

// Função assíncrona para criar uma nova notificação
async function createNotification(idtypenotification, idpurchase, idproposal, idcertificate, idrequest, description, in_for, userid) {
    if (!idtypenotification || (!idpurchase && !idproposal && !idcertificate && !idrequest) || !description || !in_for || !userid) {
        return false;
    }
    await models.sequelize.query(
        'CALL createNotification (:in_date, :in_idtypenotification, :in_idpurchase, :in_idproposal, :in_idcertificate, :in_idrequest, :in_description, :in_for, :in_userid)',
        {
            replacements: {in_date: new Date(), in_idtypenotification: idtypenotification, in_idpurchase: idpurchase, in_idproposal: idproposal, in_idcertificate: idcertificate, in_idrequest: idrequest, in_description: description, in_for: in_for, in_userid: userid},
            type: models.sequelize.QueryTypes.INSERT
        }
    );
    return true;
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
    getAllNotifications: getAllNotifications,
};