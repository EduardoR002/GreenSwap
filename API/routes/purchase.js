const { Router } = require('express');
const { createPurchase, getAllPurchases, editPurchase, createDirectPurchase, deliverDirectPurchase} = require('../controllers/purchase.controller.js')

const router = Router();

router.post('/createDirectPurchase', createDirectPurchase);
router.post("/create", createPurchase);
router.get("/getall", getAllPurchases);
router.put("/editproposal/:idproposal",editPurchase);
router.post("/deliverDirectPurchase", deliverDirectPurchase);


module.exports = router;