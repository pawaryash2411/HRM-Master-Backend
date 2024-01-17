const express = require("express");
const {
  getAllData,
  getSalarySheetForMonth,
} = require("../Controllers/PayrollSalarySheetController");
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/:date", requireAuth, getSalarySheetForMonth);
router.get("/", getAllData);

module.exports = router;
