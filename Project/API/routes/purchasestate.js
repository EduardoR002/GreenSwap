const { Router } = require('express');
const { createPurchaseState, getAllPurchaseStates, editPurchaseState } = require('../controllers/purchasestate.controller.js')

const router = Router();

router.post("/create", createPurchaseState);
router.get('/getall', getAllPurchaseStates);
router.put('/editpurchasestate/:idPurchase', editPurchaseState);

module.exports = router;