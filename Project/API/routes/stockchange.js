const { Router } = require('express');
const { createStockChange, getAllStockChanges, editChangeStock} = require('../controllers/stockchanges.controller.js')

const router = Router();

router.post("/create", createStockChange);
router.get("/getall", getAllStockChanges);
router.put("/edittchangestock/:idtypechangestock",editChangeStock);

module.exports = router;