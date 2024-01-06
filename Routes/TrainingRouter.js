const express = require("express");
const {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData
} = require("../Controllers/TrainingController");
const router = express.Router();

router.get("/", getAllData)
router.get("/:id", getSingleData)
router.post("/", postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;
