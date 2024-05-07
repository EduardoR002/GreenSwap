const { Router } = require('express');
const { createUser, getUser , getAllUsers, deleteUser, editUser} = require('../controllers/user.controller.js');

const router = Router();

router.post("/create", createUser);
router.get("/getuser/:userId", getUser)
router.get("/getallusers", getAllUsers)
router.put("/edituser/:userId", editUser)
router.delete("/deleteuser/:userId", deleteUser)

module.exports = router;