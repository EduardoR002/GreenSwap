const { Router } = require('express');
const { save } = require('../controllers/user.controller.js');

const router = Router();

router.post("/", save);

module.exports = router;