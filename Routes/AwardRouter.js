const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require("../Middlewares/singleImgUpload");

const {
  getAllData,
  getSingleData,
  addAward,
  deleteData,
  updateuser,
} = require("../Controllers/AwardController");
const router = express.Router();

router.get("/", getAllData);
router.get("/:id", getSingleData);
router.delete("/:id", deleteData);
router.post("/", upload.single("awardPhoto"), uploadedcloudinaryImages, addAward);
router.put("/:id", upload.single("awardPhoto"), updateuser);

module.exports = router;
