const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require("../Middlewares/singleImgUpload");

const {
  getAllData,
  getSingleData,
  addClient,
  deleteData,
} = require("../Controllers/ClientController");
const router = express.Router();

router.get("/", getAllData);
router.get("/:id", getSingleData);
router.delete("/:id", deleteData);
router.post("/", upload.single("image"), uploadedcloudinaryImages, addClient);

module.exports = router;
