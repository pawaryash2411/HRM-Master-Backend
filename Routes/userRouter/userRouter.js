const express = require("express");
const { registerUser, loginUser, forgotPassword, getuser} =
 require('../../Controllers/userController/userController')

// const {requireAuth} = require('../../Middlewares/requireAuth')


const router = express.Router();


router.post("/login", loginUser)
router.post("/register", registerUser)
router.get('/getuser', getuser)
router.post("/forgot-password", forgotPassword);


module.exports = router;