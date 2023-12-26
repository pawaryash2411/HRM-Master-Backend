const express = require("express");
const {getlocation } =
 require('../../Controllers/ClockIn-Out')
const router = express.Router();

router.get("/",getlocation)


module.exports = router;