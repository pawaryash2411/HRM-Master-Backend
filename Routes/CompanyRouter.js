const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require("../Middlewares/singleImgUpload");

const {
  getalldata,
  addcompany,
  updateuser,
} = require("../Controllers/CompanyController");
const router = express.Router();

router.get("/", getalldata);
// router.post("/", upload.single("logo_img"), uploadedcloudinaryImages, addcompany);
router.put("/:id", upload.single("logo_img"), updateuser);

module.exports = router;
