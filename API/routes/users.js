const { Router } = require('express');
const { createUser, getUser , getAllUsers, deleteUser} = require('../controllers/user.controller.js');

const router = Router();

router.post("/create", createUser);
router.get("/getuser/:userId", getUser)
router.get("/getallusers", getAllUsers)
router.delete("/deleteuser/:userId", deleteUser)

module.exports = router;