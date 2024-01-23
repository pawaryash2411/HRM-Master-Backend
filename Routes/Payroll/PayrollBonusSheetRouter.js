const express = require("express");
const {
  postData,
  getAllData,
  updateData,
  deleteData,
} = require("../../Controllers/Payroll/PayrollBonusSheetController");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData);
router.post("/:id", requireAuth, postData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
