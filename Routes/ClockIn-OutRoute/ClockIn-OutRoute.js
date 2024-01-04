const express = require("express");
const { getlocation, postdata, getdata, getsingle } =
    require('../../Controllers/ClockIn-OutCtrl')
const router = express.Router();

router.get("/loaction", getlocation)

router.get("/", getdata)
router.get("/:userid", getsingle)
router.post("/", postdata)


module.exports = router;