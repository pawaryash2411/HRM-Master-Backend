const express = require("express");

const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");
const { getRegisterData } = require("../Controllers/RegisterController");

router.get("/", requireAuth, getRegisterData);

module.exports = router;
