const express = require("express");
const {getalldata, postdata,deletedata} =
 require('../../Controllers/Holiday/HolidayController')
const router = express.Router();

router.get("/", getalldata)
router.post("/", postdata)
router.delete("/:id", deletedata)

module.exports = router;