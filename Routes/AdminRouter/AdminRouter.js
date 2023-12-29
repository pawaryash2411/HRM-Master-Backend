const express = require("express");

const {
  createadmin,
  loginadmin,
  createnotification,
  getadmin,
} = require("../../Controllers/AdminController/AdminController");
const { requireAuth } = require("../../Middlewares/requireAuth");

const router = express.Router();

router.post("/login", loginadmin);
router.get("/getalldata", getadmin);
router.post("/createadmin", createadmin);
router.post("/createnotification", createnotification);

module.exports = router;
