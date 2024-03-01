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
  deleteAdmin,
  approveLeave,
} = require("../../Controllers/Admin/AdminController");
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
  requireAuth,
  registerAdmin
);
router.put("/addadmin/:id", upload.single("picture"), updateAdmin);

router.post("/login", loginadmin);

router.post("/addbranch", requireAuth, addbranch);
router.get("/branch", requireAuth, getBranch);
router.put("/branch/:id", requireAuth, updateBranch);
router.delete("/branch/:id", requireAuth, deleteBranch);

router.get("/getalldata", requireAuth, getadmin);
// router.post("/createadmin", createadmin);
router.post("/createnotification", createnotification);

router.delete("/:id", deleteAdmin);

router.put("/approve/:id", approveLeave);

module.exports = router;
