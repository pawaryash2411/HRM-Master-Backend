const express = require("express");
const multer = require('multer'); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require('../../Middlewares/singleImgUpload')

const { registerUser, loginUser, forgotPassword, getuser} =
 require('../../Controllers/userController/userController')

// const {requireAuth} = require('../../Middlewares/requireAuth')


const router = express.Router();


router.post("/login", loginUser)
router.post("/register", upload.single('picture'), uploadedcloudinaryImages, registerUser)

router.get('/getuser', getuser)
router.post("/forgot-password", forgotPassword);

module.exports = router;


