const express = require("express");
const {
  getData,
  postData,
  updateData,
  deleteData,
  filterData,
  getsingledata,
} = require("../Controllers/RotaController");
const router = express.Router();
const { requireAuth } = require("../Middlewares/requireAuth");

router.get("/", getData);
router.get("/filter", filterData);
router.post("/", postData);
router.put("/:id", updateData);
router.post("/delete/:id", deleteData);
router.get("/rota-single", requireAuth, getsingledata);

module.exports = router;
