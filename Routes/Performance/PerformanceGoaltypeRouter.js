const express = require("express");
const {
  postData,
  getAllData,
  updateData,
  deleteData,
  getSingleData,
} = require("../../Controllers/Performance/PerformanceGoaltypeController");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/", requireAuth, getAllData);
router.get("/:id", requireAuth, getSingleData);
router.post("/", requireAuth, postData);
router.put("/:id", requireAuth, updateData);
router.delete("/:id", requireAuth, deleteData);

module.exports = router;
