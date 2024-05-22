const { Router } = require('express');
const { createCertificate,getAllCertificates,acceptSellerRequest,refuseSellerRequest} = require('../controllers/certificate.controller.js')

const router = Router();

router.post("/create", createCertificate);
router.get('/getall', getAllCertificates);
router.put('/acceptseller', acceptSellerRequest);
router.put('/refuseseller', refuseSellerRequest);



module.exports = router;