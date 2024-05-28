const { Router } = require('express');
const { createDirectProposal, getAllProposals, editProposal, acceptProposal, refuseProposal,cancelProposal,createFutureProposal,createPeriodicProposal, getUserProposals, getSellerProposals} = require('../controllers/proposal.controller.js')

const router = Router();

router.post("/createDirectPurchase",createDirectProposal);
router.get("/getall", getAllProposals);
router.put("/editproposal/:idproposal",editProposal);
router.post("/acceptproposal", acceptProposal);
router.post("/refuseproposal", refuseProposal);
router.put("/cancelproposal", cancelProposal);
router.post("/futureproposal", createFutureProposal);
router.post("/periodicproposal", createPeriodicProposal);
router.post("/getUserProposals", getUserProposals);
router.post("/getSellerProposals", getSellerProposals);


module.exports = router;