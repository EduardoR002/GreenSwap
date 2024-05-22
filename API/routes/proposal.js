const { Router } = require('express');
const { createDirectProposal, createProposal, getAllProposals, editProposal, acceptProposal, refuseProposal,} = require('../controllers/proposal.controller.js')

const router = Router();

router.post("/createDirectPurchase",createDirectProposal);
router.post("/create", createProposal);
router.get("/getall", getAllProposals);
router.put("/editproposal/:idproposal",editProposal);
router.post("/acceptproposal", acceptProposal);
router.post("/refuseproposal", refuseProposal);


module.exports = router;