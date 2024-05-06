const { Router } = require('express');
const { createUser, getUser } = require('../controllers/user.controller.js');

const router = Router();

router.post("/", createUser);
router.get("/:userId", getUser)


module.exports = router;