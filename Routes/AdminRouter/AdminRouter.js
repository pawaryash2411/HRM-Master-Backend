const express = require("express");

const { createadmin, loginadmin} =
 require('../../Controllers/AdminController/AdminController')


const router = express.Router();


router.post("/login", loginadmin)
router.post("/createadmin",createadmin)

module.exports = router;


