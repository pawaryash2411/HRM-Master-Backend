const express = require("express");
const {
  getlocation,
  postdata,
  getdata,
  getsingle,
} = require("../../Controllers/ClockIn-OutCtrl");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/loaction", getlocation);

router.get("/ALL", getdata);
router.get("/", requireAuth, getsingle);
router.post("/", requireAuth, postdata);

module.exports = router;
