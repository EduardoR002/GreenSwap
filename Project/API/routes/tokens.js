const { Router } = require('express');
const {createToken, deleteToken, renewToken, validateToken, getRole, getId, getSellerId} = require('../controllers/tokens.controller.js');

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
router.post('/validate', validateToken);
router.post('/getrole', getRole);
router.post('/getid', getId);
router.post('/getSellerid', getSellerId);

module.exports = router;