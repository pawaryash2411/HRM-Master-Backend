const express = require("express");

const { createadmin, loginadmin, createnotification} =
 require('../../Controllers/AdminController/AdminController')


const router = express.Router();


router.post("/login", loginadmin);
router.post("/createadmin",createadmin);
router.post("/createnotification", createnotification);

module.exports = router;


