const db = require("../Models/Clockin-OutModel");
const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getdata = async (req, res) => {
  try {
    const getalldata = await UserTimeRegistor.find()
      .populate("userid")
      .populate("adminid");
    res.status(200).json(getalldata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getdata };
