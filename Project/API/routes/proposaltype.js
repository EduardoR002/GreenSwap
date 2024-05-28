const { Router } = require('express');
const { createTypeProposal, getAllTypes, editTypeProposal } = require('../controllers/proposaltype.controller.js')

const router = Router();

router.post("/create", createTypeProposal);
router.get('/getall', getAllTypes);
router.put('/edittproposal/:idtypeProposal', editTypeProposal);

module.exports = router;