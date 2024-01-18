const express = require("express");
const {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData
} = require("../../Controllers/Payroll/PayrollHourlyController.js");
const { requireAuth } = require("../../Middlewares/requireAuth.js");
const router = express.Router();

router.get("/", getAllData)
router.get("/:id", getSingleData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;
