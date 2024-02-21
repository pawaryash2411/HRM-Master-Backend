const express = require("express");
const {
  getlocation,
  postdata,
  getdata,
  getsingle,
  putdata,
  postdataAdmin,
  putdataAdmin,
} = require("../../Controllers/Clock/ClockIn-OutCtrl");
const { requireAuth } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/loaction", getlocation);

router.get("/ALL", getdata);
router.get("/", requireAuth, getsingle);
router.post("/", requireAuth, postdata);
router.post("/admin/:id", requireAuth, postdataAdmin);
router.put("/", requireAuth, putdata);
router.put("/admin/:id", requireAuth, putdataAdmin);

module.exports = router;
