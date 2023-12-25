const express = require("express");
const multer = require('multer'); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require('../../Middlewares/singleImgUpload')
const { getalldata, getdata, putdata, postdata, DeleteData } =
    require('../../Controllers/AddstaffCtrl/AddstaffCtrl')
const router = express.Router();

router.get("/", getalldata)
router.get("/:id", getdata)

router.post("/", upload.single('picture'), uploadedcloudinaryImages, postdata)
router.put("/:id", upload.single('picture'), uploadedcloudinaryImages, putdata)

router.delete("/:id", DeleteData)

module.exports = router;