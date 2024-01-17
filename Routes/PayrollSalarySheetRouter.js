const express = require("express");
const {
  getAllData,
  getSalarySheetForMonth,
  updatePayUser,
} = require("../Controllers/PayrollSalarySheetController");
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.post("/:id", requireAuth, updatePayUser);
router.get("/:date", requireAuth, getSalarySheetForMonth);
router.get("/", getAllData);

module.exports = router;
