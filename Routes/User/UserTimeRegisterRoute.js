const express = require("express");
const { getdata } = require("../../Controllers/User/UserTimeRegisterController.js");
const { requireAuth } = require("../../Middlewares/requireAuth.js");

const router = express.Router();

router.get("/", requireAuth, getdata);

module.exports = router;
