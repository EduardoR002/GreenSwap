const { Router } = require('express');
const { createProposalState, getAllStates, editProposalState } = require('../controllers/proposalstate.controller.js')

const router = Router();

router.post("/create", createProposalState);
router.get('/getall', getAllStates);
router.put('/editproposalstate/:idtypeProposal', editProposalState);

module.exports = router;