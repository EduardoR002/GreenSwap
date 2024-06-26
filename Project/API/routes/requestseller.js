const { Router } = require('express');
const { createRequestSeller, getAllRequestSellers ,editRequestSeller} = require('../controllers/requestseller.controller.js')

const router = Router();

router.post("/create", createRequestSeller);
router.get('/getall', getAllRequestSellers);
router.put('/editrequestseller/:idrequestseller', editRequestSeller);

module.exports = router;