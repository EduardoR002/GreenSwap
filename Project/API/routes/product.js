const { Router } = require('express');
const { createProduct, getProduct, getAllProducts,editProduct,editProductStock, getBestProducts, getProductsBySeller} = require('../controllers/product.controller.js')

const router = Router();

router.post("/create", createProduct);
router.post("/getproduct", getProduct);
router.post("/getall", getAllProducts);
router.put("/editproduct/:idproduct",editProduct);
router.put("/editstockproduct/:idproduct",editProductStock);
router.get("/getBestProducts", getBestProducts);
router.post("/getProductsBySeller", getProductsBySeller);

module.exports = router;