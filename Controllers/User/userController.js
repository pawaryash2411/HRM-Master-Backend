const db = require("../../Models/User/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../emailController");
const AdminModel = require("../../Models/Admin/AdminModel");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const SuperAdminModel = require("../../Models/SuperAdmin/SuperAdminModel");

dotenv.config();

const getuser = async (req, res) => {
  try {
    console.log(req.user.id);
    if (req.user.id === process.env.SUPER_EMAIL) {
      return res.status(200).json({
        user: { email: "superadmin@gmail.com" },
        role: "Master",
      });
    }
    const user = await db
      .findById(req.user.id)
      .populate("leave branch_id monthly_pay_grade hourly_pay_grade");

    if (!user) {
      const admin = await AdminModel.findById(req.user.id).populate(
        "branch_id"
      );
      if (!admin) {
        const superAdmin = await SuperAdminModel.findById(req.user.id);
        if (!superAdmin) {
          return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ user: superAdmin, role: "SuperAdmin" });
      }
      return res.status(200).json({ user: admin, role: "admin" });
    }

    res.status(200).json({ user, role: "user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getusers = async (req, res) => {
  const { id } = req.user;
  const admin = await AdminModel.findById(id);
  try {
    const users = await db
      .find({ branch_id: admin.branch_id })
      .populate("leave monthly_pay_grade hourly_pay_grade");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const {
    mobile_no,
    name,
    present_address,
    user_id,
    role,
    permanent_address,
    display_frontmonitor,
    attendense_calculation,
    department,
    designation,
    weekday_shift,
    both_shift,
    joindate,
    email,
    password,
    shift,
    monthly_pay_grade,
    hourly_pay_grade,
    adminId,
  } = req.body;

  const uploadimg = req.uploadedImageUrl;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const exists = await db.findOne({ email });
    const adminExists = await AdminModel.findOne({ email });
    if (exists || adminExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const admin = await AdminModel.findById(adminId);

    const newUser = new db({
      mobile_no,
      name,
      present_address,
      user_id,
      role,
      permanent_address,

      display_frontmonitor,
      attendense_calculation,
      department,
      designation,
      weekday_shift,
      both_shift,
      picture: uploadimg,
      joindate,
      email,
      shift,
      password,
      monthly_pay_grade: monthly_pay_grade,
      hourly_pay_grade: hourly_pay_grade,
      adminId,
      branch_id: admin.branch_id,
    });

    const userRegister = await newUser.save();
    res.status(200).json({ userRegister, message: "Staff Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateuser = async (req, res) => {
  const {
    supervisor_name,
    mobile_no,
    name,
    present_address,
    user_id,
    role,
    shift,
    permanent_address,
    display_frontmonitor,
    attendense_calculation,
    department,
    designation,
    weekday_shift,
    both_shift,
    joindate,
    email,
    monthly_pay_grade,
    hourly_pay_grade,
    password,
  } = req.body;

  let picture;
  if (req.file) {
    const dataUrl = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUrl);
    picture = result.secure_url;
  }

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updateuser = await db.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          supervisor_name,
          mobile_no,
          name,
          present_address,
          user_id,
          role,
          permanent_address,
          display_frontmonitor,
          attendense_calculation,
          department,
          designation,
          weekday_shift,
          both_shift,
          picture,
          monthly_pay_grade,
          hourly_pay_grade,
          joindate,
          shift,
          email,
          password: hashedPassword,
        },
      }
    );
    res.status(200).json({ success: true, message: "update staff" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1yr",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    if (email === process.env.SUPER_EMAIL) {
      const isMatch = await bcrypt.compare(password, process.env.SUPER_PW);
      if (isMatch) {
        return res.status(200).json({
          user: { email: process.env.SUPER_EMAIL },
          token: createToken(process.env.SUPER_EMAIL),
          role: "Master",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Super admin password invalid" });
      }
    }
    const user = await db
      .findOne({ email })
      .populate("branch_id")
      .populate("leave");
    console.log(user);
    if (!user) {
      const admin = await AdminModel.findOne({ email })
        .populate("branch_id")
        .populate("leave");
      if (!admin) {
        const superAdmin = await SuperAdminModel.findOne({ email });
        if (!superAdmin) {
          return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = createToken(superAdmin._id);
        return res
          .status(200)
          .json({ user: superAdmin, token, role: "Super Admin" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = createToken(admin._id);
      return res.status(200).json({ user: admin, token, role: "admin" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    console.log("datatoken", token);
    res.status(200).json({ user, token, role: "user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteuser = async (req, res) => {
  try {
    let result = await db.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await db.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;
  const { token } = req.params;
  console.log(req.params, "token");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken, "hashedToken");

  try {
    const user = await db.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log("user", user);

    if (!user) {
      return res
        .status(400)
        .json({ error: "Token Expired or Invalid. Please try again." });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.json({ message: "Password reset successfully." });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const changepassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, oldPW } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID not provided." });
    }

    if (!password) {
      return res.status(400).json({ error: "New password not provided." });
    }

    const user = await db.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const comparePW = await bcrypt.compare(oldPW, user.password);
    console.log(comparePW);
    if (!comparePW) {
      return res.status(404).json({ error: "Old password did not match" });
    }
    user.password = password;
    const updatedUser = await user.save();

    res.json({ message: "Password updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getuser,
  updateuser,
  resetPassword,
  deleteuser,
  getusers,
  changepassword,
};
