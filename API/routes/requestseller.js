const { Router } = require('express');
const { createRequestSeller, getAllRequestSellers } = require('../controllers/requestseller.controller.js')

const router = Router();

router.post("/create", createRequestSeller);
router.get('/getall', getAllRequestSellers);

module.exports = router;