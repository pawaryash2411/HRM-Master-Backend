const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getRegisterData = async (req, res) => {
  try {
    const register = await UserTimeRegistor.find({
      adminid: req.user.id,
    }).populate("userid");
    return res.status(200).json({
      success: true,
      register,
      message: "Register Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const verifyClockData = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UserTimeRegistor.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );
    res.status(200).json({ message: "Updated succesfully", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRegisterData, verifyClockData };
