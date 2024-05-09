const { Router } = require('express');
const { createRequestState, getAllRequestStates, editRequestState } = require('../controllers/requeststate.controller.js')

const router = Router();

router.post("/create", createRequestState);
router.get('/getall', getAllRequestStates);
router.put('/editrequeststate/:idRequest', editRequestState);

module.exports = router;