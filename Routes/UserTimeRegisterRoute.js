const express = require("express");
const { getdata } = require("../Controllers/UserTimeRegisterController.js");
const { requireAuth } = require("../Middlewares/requireAuth");

const router = express.Router();

router.get("/", requireAuth, getdata);

module.exports = router;
