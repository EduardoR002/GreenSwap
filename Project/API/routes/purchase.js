const { Router } = require('express');
const { createPurchase, getAllPurchases, editPurchase, createDirectPurchase, deliverPurchase, cancelPeriodicPurchase, getUserPurchases, deliveredPurchase, getSellerPurchases} = require('../controllers/purchase.controller.js')

const router = Router();

router.post('/createDirectPurchase', createDirectPurchase);
router.post("/create", createPurchase);
router.get("/getall", getAllPurchases);
router.put("/editproposal/:idproposal",editPurchase);
router.post("/deliverPurchase", deliverPurchase);
router.post("/cancelPeriodic", cancelPeriodicPurchase);
router.post("/getUserPurchase", getUserPurchases);
router.post("/deliveredpurchase", deliveredPurchase);
router.post('/getSellerPurchase', getSellerPurchases);


module.exports = router;