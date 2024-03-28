const express = require("express");
const { getAllData, postData, deleteData, updateData } = require("../../Controllers/User/AdminRoleController")
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;