const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  deleteSuperAdmin,
  registerSuperAdmin,
  getSuperAdmin,
  updateSuperAdmin,
} = require("../../Controllers/SuperAdmin/SuperAdminController");
const { requireAuth } = require("../../Middlewares/requireAuth");
const uploadSingleImageToCloudinary = require("../../Middlewares/singleImgUpload");

const router = express.Router();

router.post("/", requireAuth, upload.single('logo'), uploadSingleImageToCloudinary, registerSuperAdmin);
router.put("/:id", updateSuperAdmin);

router.get("/", getSuperAdmin);
// router.post("/createadmin", createadmin);

router.delete("/:id", deleteSuperAdmin);

module.exports = router;
