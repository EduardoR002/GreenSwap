const { Router } = require('express');
const { createTypeChange, getAllTypes, editTypechange} = require('../controllers/tchange.controller.js')

const router = Router();

router.post("/create", createTypeChange);
router.get("/getall", getAllTypes);
router.put("/edittchange/:idtypechange",editTypechange);

module.exports = router;