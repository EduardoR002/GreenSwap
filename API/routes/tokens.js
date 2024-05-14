const { Router } = require('express');
const {createTokenUser, createTokenCertifier} = require('../controllers/tokens.controller.js');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { email, idUser} = req.body;
        const token = await createTokenUser(email, idUser, 'user');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create token', error: error.message });
    }
});

module.exports = router;