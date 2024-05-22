const { Router } = require('express');
const { createPurchase, getAllPurchases, editPurchase, createDirectPurchase, deliverPurchase, cancelPeriodicPurchase} = require('../controllers/purchase.controller.js')

const router = Router();

router.post('/createDirectPurchase', createDirectPurchase);
router.post("/create", createPurchase);
router.get("/getall", getAllPurchases);
router.put("/editproposal/:idproposal",editPurchase);
router.post("/deliverDirectPurchase", deliverPurchase);
router.post("/cancelPeriodic", cancelPeriodicPurchase);


module.exports = router;