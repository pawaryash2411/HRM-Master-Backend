const db = require("../Models/Clockin-OutModel");
const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getdata = async (req, res) => {
  try {
    const isUser = await userModel.findById(req.user.id);
    let register;
    if (!isUser) {
      register = await UserTimeRegistor.find({
        adminid: req.user.id,
      }).populate("userid adminid");
    } else {
      register = await UserTimeRegistor.find({
        userid: req.user.id,
        verified: true,
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
