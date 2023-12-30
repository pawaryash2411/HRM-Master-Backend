const express = require("express");

const {
  createadmin,
  loginadmin,
  createnotification,
  getadmin,
  registerAdmin,
  updateAdmin,
  addbranch,
  getBranch,
  updateBranch,
  deleteBranch,
} = require("../../Controllers/AdminController/AdminController");
const { requireAuth } = require("../../Middlewares/requireAuth");

const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadedcloudinaryImages = require("../../Middlewares/singleImgUpload");
const router = express.Router();

router.post(
  "/addadmin",
  upload.single("picture"),
  uploadedcloudinaryImages,
  registerAdmin
);
router.put("/addadmin/:id", upload.single("picture"), updateAdmin);

router.post("/login", loginadmin);

router.post("/addbranch", addbranch);
router.get("/branch", getBranch);
router.put("/branch/:id", updateBranch);
router.delete("/branch/:id", deleteBranch);

router.get("/getalldata", getadmin);
// router.post("/createadmin", createadmin);
router.post("/createnotification", createnotification);

module.exports = router;
