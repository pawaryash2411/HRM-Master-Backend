const UserTimeRegistor = require("../Models/UserTimeRegistor");

const getRegisterData = async (req, res) => {
  try {
    const register = await UserTimeRegistor.findOne({ userid: req.user.id });
    res.status(200).json({
      success: true,
      register,
      message: "Register Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRegisterData };
