const { Router } = require('express');
const { createCertifier,getCertifier, getAllCertifiers, editCertifier} = require('../controllers/certifier.controller.js')

const router = Router();

router.post("/create", createCertifier);
router.get("/getcertifier/:certifierId", getCertifier);
router.get('/getall', getAllCertifiers);
router.put('/editcertifier/:certifierId', editCertifier);

module.exports = router;