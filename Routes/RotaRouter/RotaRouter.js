const express = require("express");
const { getData, postData, updateData, deleteData, filterData } = require("../../Controllers/RotaController/RotaController");
const router = express.Router();
const { requireAuth } = require("../../Middlewares/requireAuth")

router.get("/", getData)
router.get("/filter", filterData);
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;
