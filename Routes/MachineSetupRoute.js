const express = require("express");
const { postData, getAllData, updateData, deleteData } = require("../Controllers/MachineSetupController")
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)

module.exports = router;