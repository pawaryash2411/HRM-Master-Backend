const express = require("express");
const {
    getAllData,
    postData,
    updateData,
    deleteData,
} = require("../Controllers/LeaveCategoryController");
const { authMiddleware, requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;