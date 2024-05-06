const { Router } = require('express');
const { createUser } = require('../controllers/user.controller.js');

const router = Router();

router.post("/", createUser);

module.exports = router;