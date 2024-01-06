const express = require("express");
const {getalldata, postdata} =
 require('../Controllers/HolidayController')
const router = express.Router();

router.get("/", getalldata)
router.post("/", postdata)

module.exports = router;