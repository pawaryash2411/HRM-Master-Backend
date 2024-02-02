const express = require("express");

const {
  deleteSuperAdmin,
  registerSuperAdmin,
  getSuperAdmin,
  updateSuperAdmin,
} = require("../../Controllers/SuperAdmin/SuperAdminController");
const { requireAuth } = require("../../Middlewares/requireAuth");

const router = express.Router();

router.post("/", requireAuth, registerSuperAdmin);
router.put("/:id", updateSuperAdmin);

router.get("/", getSuperAdmin);
// router.post("/createadmin", createadmin);

router.delete("/:id", deleteSuperAdmin);

module.exports = router;
