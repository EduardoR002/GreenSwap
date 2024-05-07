const { Router } = require('express');
const { createTypeProduct, getAllTypes, editTypeProduct } = require('../controllers/tproduct.controller.js')

const router = Router();

router.post("/create", createTypeProduct);
router.get("/getall", getAllTypes);
router.put("/edittproduct/:idtypeproduct",editTypeProduct);

module.exports = router;