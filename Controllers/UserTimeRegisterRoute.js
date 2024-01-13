const db = require("../Models/Clockin-OutModel");
const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getdata = async (req, res) => {
  try {
    const getalldata = await UserTimeRegistor.findOne({
      adminid: req.user.id,
    }).populate("userid adminid");
    if (!getalldata) {
      const registers = await UserTimeRegistor.findOne({
        userid: req.user.id,
      }).populate("userid");
      return res.status(200).json({ registers });
    }
    res.status(200).json({ registers: getalldata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getdata };
