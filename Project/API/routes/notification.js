const { Router } = require('express');
const { createNotification, getAllNotifications} = require('../controllers/notification.controller.js')

const router = Router();

router.get("/getall", getAllNotifications);

module.exports = router;