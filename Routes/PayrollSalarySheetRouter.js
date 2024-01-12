const express = require("express");
const {
  getAllData,
} = require("../Controllers/PayrollSalarySheetController");
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData);

module.exports = router;
