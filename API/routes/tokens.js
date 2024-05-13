const { Router } = require('express');
const {createTokenUser, createTokenCertifier} = require('../controllers/tokens.controller.js');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { email, idcertifier} = req.body;
        const token = await createTokenCertifier(email, idcertifier, 'certifier');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create token', error: error.message });
    }
});

module.exports = router;