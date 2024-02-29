const express = require("express");
const {
  getData,
  postData,
  updateData,
  deleteData,
  getsingledata,
  checkRule,
} = require("../../Controllers/Rota/AttendanceRuleController");
const router = express.Router();
const { requireAuth } = require("../../Middlewares/requireAuth");

router.get("/", requireAuth, getData);
router.get("/rota-single", requireAuth, getsingledata);
router.get("/:date", requireAuth, checkRule);
// router.get("/admin/:id", requireAuth, checkRotaAdmin);
// router.get("/filter", filterData);
router.post("/", postData);
router.put("/:id", updateData);
router.post("/delete/:id", deleteData);

module.exports = router;
