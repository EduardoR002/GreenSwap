const { Router } = require('express');
const { createTypePurchase, getAllTypes, editTypePurchase } = require('../controllers/purchasetype.controller.js')

const router = Router();

router.post("/create", createTypePurchase);
router.get('/getall', getAllTypes);
router.put('/edittpurchase/:idtypePurchase', editTypePurchase);

module.exports = router;