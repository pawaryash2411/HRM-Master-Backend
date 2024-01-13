const db = require("../Models/Clockin-OutModel");
const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getdata = async (req, res) => {
  try {
    const getAllData = await UserTimeRegistor.findOne({
      adminid: req.user.id,
    }).populate("userid adminid");
    res.status(200).json({
      success: true,
      getAllData,
      message: "All Approved Work Time Hour Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getdata };
