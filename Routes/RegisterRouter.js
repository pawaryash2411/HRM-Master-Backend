const express = require("express");

const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");
const {
  getRegisterData,
  getFilteredRegisterData,
} = require("../Controllers/RegisterController");

router.get("/", requireAuth, getRegisterData);
router.get("/:id", requireAuth, getFilteredRegisterData);

module.exports = router;
