const { Router } = require('express');
const { createTypePurchase, getAllTypes, editTypePurchase } = require('../controllers/tpurchase.controller.js')

const router = Router();

router.post("/create", createTypePurchase);
router.get('/getall', getAllTypes);
router.put('/edittnotific/:idtypePurchase', editTypePurchase);

module.exports = router;