const { Router } = require('express');
const {createToken} = require('../controllers/tokens.controller.js');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { email, userId } = req.body;
        const token = await createToken(email, userId);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create token', error: error.message });
    }
});

module.exports = router;