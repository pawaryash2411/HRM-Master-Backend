const express = require("express");
const { postData, getAllData, updateData, deleteData } = require("../../Controllers/Rota/RuleCategoryController");
const router = express.Router();
const { requireAuth } = require("../../Middlewares/requireAuth");

router.get("/", getAllData);
router.post("/", requireAuth, postData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
