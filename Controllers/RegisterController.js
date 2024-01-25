const UserTimeRegistor = require("../Models/User/UserTimeRegistor");

const getRegisterData = async (req, res) => {
  try {
    const register = await UserTimeRegistor.find({
      adminid: req.user.id,
    }).populate("userid");
    const finalRegister = register.filter((el) => el.userid);
    return res.status(200).json({
      success: true,
      register: finalRegister,
      message: "Register Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRegisterData };
