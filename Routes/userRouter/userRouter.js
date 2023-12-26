const express = require("express");
const { registerUser, loginUser , forgotPassword} =
 require('../../Controllers/userController/userController')
const router = express.Router();


router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/forgot-password", forgotPassword);


module.exports = router;