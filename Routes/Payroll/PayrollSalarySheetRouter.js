const express = require("express");
const {
  getAllData,
  getSalarySheetForMonth,
  updatePayUser,
  getIndividualSalary,
} = require("../../Controllers/Payroll/PayrollSalarySheetController");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.post("/:id", requireAuth, updatePayUser);
router.get("/:date", requireAuth, getSalarySheetForMonth);
router.get("/user/:date", requireAuth, getIndividualSalary);

module.exports = router;
