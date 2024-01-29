const express = require("express");

const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");
const {
  getRegisterData,
  getFilteredRegisterData,
  getAllStaffMemberByAdmin,
} = require("../Controllers/RegisterController");

router.get("/", requireAuth, getRegisterData);
router.get("/:id", requireAuth, getFilteredRegisterData);
router.get("/all-staff", requireAuth, getAllStaffMemberByAdmin);

module.exports = router;
