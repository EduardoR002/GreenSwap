const { Router } = require('express');
const { createUser, getUser , getAllUsers} = require('../controllers/user.controller.js');

const router = Router();

router.post("/", createUser);
router.get("/:userId", getUser)
router.get("/all/users", getAllUsers)


module.exports = router;