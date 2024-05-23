const { Router } = require('express');
const {doEvaluation, removeEvaluation} = require('../controllers/evaluation.controller.js');

const router = Router();

router.post('/doevaluation', doEvaluation);
router.delete('/removeEvaluation', removeEvaluation);

module.exports = router;