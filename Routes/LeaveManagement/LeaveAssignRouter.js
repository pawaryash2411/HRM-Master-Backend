const express = require("express");
const {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData
} = require("../../Controllers/LeaveManagement/LeaveAssignController");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)
router.get("/:id", getSingleData)

module.exports = router;