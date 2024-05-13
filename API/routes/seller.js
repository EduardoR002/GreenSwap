const { Router } = require('express');
const { createSeller, getSeller,getAllSellers, editSeller} = require('../controllers/seller.controller.js')

const router = Router();

router.post("/create", createSeller);
router.get("/getall", getAllSellers);
router.put("/get/:idseller",getSeller);
router.put("/editSeller/:idseller",editSeller);

module.exports = router;