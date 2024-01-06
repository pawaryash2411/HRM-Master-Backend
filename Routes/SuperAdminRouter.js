

const express = require("express");
const multer = require('multer'); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require('../Middlewares/singleImgUpload')

const { loginSuperAdmin} =
 require('../Controllers/SuperAdminController')

// const {requireAuth} = require('../../Middlewares/requireAuth')


const router = express.Router();


router.post("/login", loginSuperAdmin)


module.exports = router;


