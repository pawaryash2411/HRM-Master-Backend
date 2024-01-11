const express = require("express");
const {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData
} = require("../Controllers/PayrollMonthlyController");
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.get("/:id", getSingleData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;
