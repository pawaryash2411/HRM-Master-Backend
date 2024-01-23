const db = require("../../Models/Clock/Clockin-OutModel");
const UserTimeRegistor = require("../../Models/User/UserTimeRegistor");
const userModel = require("../../Models/User/userModel");

const getdata = async (req, res) => {
  try {
    const isUser = await userModel.findById(req.user.id);
    let register;
    if (!isUser) {
      register = await UserTimeRegistor.findOne({
        adminid: req.user.id,
        userid: null,
      }).populate("userid adminid");
    } else {
      register = await UserTimeRegistor.findOne({
        userid: req.user.id,
      }).populate("userid");
    }
    res.status(200).json({
      success: true,
      register,
      message: "All Approved Work Time Hour Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getdata };
