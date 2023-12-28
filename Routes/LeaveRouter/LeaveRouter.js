const express = require("express");
const {
  getdata,
  getalldata,
  postdata,
  putdata,
  deletedata,
} = require("../../Controllers/LeaveController/LeaveController");
const { authMiddleware } = require("../../Middlewares/requireAuth");
const router = express.Router();

router.get("/",getalldata)
router.get("/:id",getdata)
router.post("/", postdata)
router.put("/:id",putdata)
router.delete("/:id",deletedata)

module.exports = router;
