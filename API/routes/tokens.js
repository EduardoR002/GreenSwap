const { Router } = require('express');
const {createToken, deleteToken, renewToken} = require('../controllers/tokens.controller.js');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { id, role} = req.body;
        const token = await createToken(id, role);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create token', error: error.message });
    }
});
router.delete('/delete', deleteToken);
router.put('/renew', renewToken);

module.exports = router;