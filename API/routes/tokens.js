const { Router } = require('express');
const {createToken, deleteToken} = require('../controllers/tokens.controller.js');

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { id, role} = req.body;
        const token = await createTokenUser(id, role);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create token', error: error.message });
    }
});
router.delete('/delete', deleteToken)

module.exports = router;