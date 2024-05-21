const { Router } = require('express');
const { createProduct, getProduct, getAllProducts,editProduct,editProductStock} = require('../controllers/product.controller.js')

const router = Router();

router.post("/create", createProduct);
router.put("/get/:idproduct",getProduct);
router.post("/getall", getAllProducts);
router.put("/editproduct/:idproduct",editProduct);
router.put("/editstockproduct/:idproduct",editProductStock);


module.exports = router;