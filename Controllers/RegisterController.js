const UserTimeRegistor = require("../Models/User/UserTimeRegistor");
const userModel = require("../Models/User/userModel");

const getRegisterData = async (req, res) => {
  try {
    const register = await UserTimeRegistor.find({
      adminid: req.user.id,
    }).populate("userid");
    const finalRegister = register.filter((el) => el.userid);
    console.log(finalRegister);
    return res.status(200).json({
      success: true,
      register: finalRegister,
      message: "Register Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredRegisterData = async (req, res) => {
  try {
    const { id } = req.params;
    const register = await UserTimeRegistor.find().populate("userid adminid");
    if (id === "all") {
      return res.status(200).json({ register });
    }
    const filteredRegister = register.filter(
      (el) => String(el.adminid.branch_id) === id
    );
    return res.status(200).json({ register: filteredRegister });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStaffMemberByAdmin = async (req, res) => {
  try {
    const admins = await userModel.find({ role: "admin" });
    const adminData = [];
    console.log(admins)
    for (const admin of admins) {
      const users = await userModel.find({ adminId: admin._id });
      console.log("users:", users)
      adminData.push({
        adminId: admin._id,
        adminName: admin.name,
        adminEmail: admin.email,
        users: users
      });
    }

    return res.status(200).json({
      success: true,
      adminData,
      message: "Staff By Admin Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getRegisterData, getFilteredRegisterData, getAllStaffMemberByAdmin };
