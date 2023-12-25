const express = require("express");
const {getdata, getalldata, postdata, putdata, deletedata } =
 require('../../Controllers/PlanningController/DepartmentCtrl')
const router = express.Router();

router.get("/",getalldata)
router.get("/:_id",getdata)
router.post("/", postdata)
router.put("/:id",putdata)
router.delete("/:id",deletedata)

module.exports = router;