const db = require("../../Models/userModel/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../Controllers/emailController");

const getuser = async (req, res) => {
  try {
    const user = await db.findById(req.user).populate("leave");

    if (!user) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getusers = async (req, res) => {
  try {
    const users = await db.find().populate("leave");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const {
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
    joindate,
    email,
    password,
    location,
  } = req.body;

  const uploadimg = req.uploadedImageUrl;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Please enter a strong password" });
    }

    const exists = await db.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new db({
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
      picture: uploadimg,
      joindate,
      email,
      location,
      password,
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
    location,
  } = req.body;

  const uploadimg = req.uploadedImageUrl;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Please enter a strong password" });
    }

    const exists = await db.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
          picture: uploadimg,
          joindate,
          email,
          location,
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
    const user = await db.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    console.log("datatoken", token);
    res.status(200).json({ user, token });
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

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getuser,
  updateuser,
  resetPassword,
  deleteuser,
  getusers,
};
