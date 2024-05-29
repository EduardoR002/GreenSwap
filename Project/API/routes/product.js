const { Router } = require('express');
const multer = require('multer');
const { createProduct, getProduct, getAllProducts,editProduct,editProductStock, getBestProducts, getProductsBySeller} = require('../controllers/product.controller.js')


const storage = multer.memoryStorage();
const router = Router();
const upload = multer({ storage: storage });


router.post("/create", upload.single('photo'), createProduct);
router.post("/getproduct", getProduct);
router.post("/getall", getAllProducts);
router.put("/editproduct/:idproduct",editProduct);
router.put("/editstockproduct/:idproduct",editProductStock);
router.get("/getBestProducts", getBestProducts);
router.post("/getProductsBySeller", getProductsBySeller);

module.exports = router;