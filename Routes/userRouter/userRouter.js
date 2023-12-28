const express = require("express");
const multer = require('multer'); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require('../../Middlewares/singleImgUpload')

const { registerUser, loginUser, forgotPassword, getuser, updateuser, deleteuser} =
 require('../../Controllers/userController/userController')

// const {requireAuth} = require('../../Middlewares/requireAuth')


const router = express.Router();


router.post("/login", loginUser)
router.post("/addstaff", upload.single('picture'), uploadedcloudinaryImages, registerUser)
router.put("/addstaff/:id", upload.single('picture'), uploadedcloudinaryImages, updateuser)

router.get('/getuser', getuser)
router.post("/forgot-password", forgotPassword);
router.delete('/deleteuser/:id', deleteuser)

module.exports = router;


