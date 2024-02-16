const express = require("express");

const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");

const {
  userReport,
  adminReport,
} = require("../Controllers/ProjectReportController");

router.get("/admin/:projectId", requireAuth, adminReport);
router.get("/user/:projectId", requireAuth, userReport);

module.exports = router;
