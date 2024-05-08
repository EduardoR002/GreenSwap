const { Router } = require('express');
const { createTypeNotification, getAllTypes, editTypeNotification } = require('../controllers/tnotific.controller.js')

const router = Router();

router.post("/create", createTypeNotification);
router.get('/getall', getAllTypes);
router.put('/edittnotific/:idtypenotification', editTypeNotification);

module.exports = router;