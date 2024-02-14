const express = require("express");
const {
  postProjectClock,
  getdata,
  getsingle,
  putProjectClock,
} = require("../Controllers/ProjectClockController.js");
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/ALL", getdata);
router.get("/", requireAuth, getsingle);
router.post("/", requireAuth, postProjectClock);
router.put("/", requireAuth, putProjectClock);

module.exports = router;
