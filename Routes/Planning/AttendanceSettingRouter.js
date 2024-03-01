const express = require("express");
const {
    addAttendanceSetting,
    getAllAttendanceSetting,
    updateAttendanceSetting,
} = require("../../Controllers/Planning/AttendanceSettingController");
const router = express.Router();

router.get("/", getAllAttendanceSetting);
router.post("/", addAttendanceSetting);
router.put("/:id", updateAttendanceSetting);

module.exports = router;
