const express = require("express");
const { getalldata, postdata, putdata, deletedata } =
 require('../../Controllers/PlanningController/DpartmntDesigntionCtrl')
const router = express.Router();

router.get("/",getalldata)
router.post("/", postdata)
router.put("/:id",putdata)
router.delete("/:id",deletedata)

module.exports = router;