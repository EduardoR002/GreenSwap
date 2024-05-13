const { Router } = require('express');
const { createPurchase, getAllPurchases, editPurchase,} = require('../controllers/purchase.controller.js')

const router = Router();

router.post("/create", createPurchase);
router.get("/getall", getAllPurchases);
router.put("/editproposal/:idproposal",editPurchase);


module.exports = router;