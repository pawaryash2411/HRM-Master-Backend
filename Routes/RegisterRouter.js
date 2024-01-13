const express = require("express");

const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");
const {
  getRegisterData,
  verifyClockData,
} = require("../Controllers/RegisterController");

router.get("/", requireAuth, getRegisterData);
router.put("/verify/:id", requireAuth, verifyClockData);

module.exports = router;
