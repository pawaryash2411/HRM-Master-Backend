const express = require("express");
const {
  getdata,
  getalldata,
  postdata,
  putdata,
  deletedata,
} = require("../Controllers/LeaveController");
const { authMiddleware, requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getalldata)
router.get("/:id", getdata)
router.post("/", requireAuth, postdata)
router.put("/:id", putdata)
router.delete("/:id", deletedata)

module.exports = router;
