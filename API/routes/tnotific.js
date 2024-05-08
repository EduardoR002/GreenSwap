const { Router } = require('express');
const { createTypeNotification, getAllTypes } = require('../controllers/tnotific.controller.js')

const router = Router();

router.post("/create", createTypeNotification);
router.get('/getall', getAllTypes);

module.exports = router;