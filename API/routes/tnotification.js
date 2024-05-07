const { Router } = require('express');
const { createTypeNotification } = require('../controllers/tnotification.controller.js')

const router = Router();

router.post("/create", createTypeNotification);


module.exports = router;