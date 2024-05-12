const { Router } = require('express');
const { createCertificate,getAllCertificates} = require('../controllers/certificate.controller.js')

const router = Router();

router.post("/create", createCertificate);
router.get('/getall', getAllCertificates);

module.exports = router;