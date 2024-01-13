const db = require("../Models/AdminModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const branchModel = require("../Models/branchModel");
const LeaveModel = require("../Models/LeaveModel");
const userModel = require("../Models/userModel");

const registerAdmin = async (req, res) => {
  const {
    mobile_no,
    name,
    present_address,
    user_id,
    permanent_address,
    display_frontmonitor,
    attendance_calculation,
    department,
    designation,
    weekday_shift,
    both_shift,
    joindate,
    email,
    password,
    monthly_pay_grade,
    hourly_pay_grade,
    branch_id,
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
    const userExists = await userModel.findOne({ email });
    if (exists || userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAdmin = new db({
      mobile_no,
      name,
      present_address,
      user_id,
      permanent_address,
      display_frontmonitor,
      attendance_calculation,
      department,
      designation,
      weekday_shift,
      both_shift,
      picture: uploadimg,
      joindate,
      email,
      password,
      branch_id,
      monthly_pay_grade,
      hourly_pay_grade,
    });

    const AdminRegister = await newAdmin.save();

    await branchModel.findByIdAndUpdate(branch_id, {
      admin_id: AdminRegister._id,
    });

    res
      .status(200)
      .json({ success: true, AdminRegister, message: "Admin Created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginadmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const admin = await db.findOne({ email });
    console.log(admin);
    if (!admin) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(admin._id);
    console.log("datatoken", token);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createnotification = async (req, res) => {
  try {
    const admindata = await db.findOne({ email: req.body.email });
    console.log(admindata);
    admindata.notifications.push(req.body.notifications[0]);
    await admindata.save();
    res.status(200).send({
      success: true,
      admindata,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "internal server Error" + error });
  }
};

const getadmin = async (req, res) => {
  try {
    const admindata = await db
      .find()
      .populate("leave branch_id monthly_pay_grade hourly_pay_grade");
    res.status(200).send({
      success: true,
      admindata,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "internal server Error" + error });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await db.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "internal server Error" + error });
  }
};

const addbranch = async (req, res) => {
  try {
    const branchdata = new branchModel({
      branch_name: req.body.branch_name,
      location: JSON.parse(req.body.location),
      address: req.body.address,
    });

    let data = await branchdata.save();

    res.status(200).send({
      success: true,
      message: "Added successfully",
      branch: data,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Internal server error: " + error });
  }
};

const updateBranch = async (req, res) => {
  const { id: branchId } = req.params;
  try {
    const updatedBranchData = await branchModel.findByIdAndUpdate(
      branchId,
      {
        branch_name: req.body.branch_name,
        location: req.body.location,
        address: req.body.address,
      },
      { new: true } // This option returns the updated document
    );

    res.status(200).send({
      success: true,
      branch: updatedBranchData,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Internal server error: " + error });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    await branchModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Internal server error: " + error });
  }
};

const getBranch = async (req, res) => {
  try {
    const branches = await branchModel.find();
    res.status(200).json({ branches });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Internal server error: " + error });
  }
};

const updateAdmin = async (req, res) => {
  const {
    mobile_no,
    name,
    present_address,
    user_id,
    permanent_address,
    display_frontmonitor,
    attendance_calculation,
    department,
    designation,
    weekday_shift,
    both_shift,
    joindate,
    email,
    password,
    monthly_pay_grade,
    hourly_pay_grade,
    location,
    branch_id,
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

    const updateuser = await db.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          mobile_no,
          name,
          present_address,
          user_id,
          permanent_address,
          display_frontmonitor,
          attendance_calculation,
          department,
          designation,
          weekday_shift,
          both_shift,
          picture,
          joindate,
          monthly_pay_grade,
          hourly_pay_grade,
          email,
          location,
          password,
          branch_id,
        },
      }
    );
    await branchModel.findByIdAndUpdate(branch_id, {
      admin_id: req.params.id,
    });
    res.status(200).json({ success: true, message: "update staff" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveLeave = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await LeaveModel.findByIdAndUpdate(id, {
    status: status === "approve" ? "pending" : "approve",
  });
  res.status(200).json({ message: "Status changed successfully" });
};

module.exports = {
  registerAdmin,
  loginadmin,
  createnotification,
  getadmin,
  updateAdmin,
  addbranch,
  getBranch,
  updateBranch,
  deleteBranch,
  deleteAdmin,
  approveLeave,
};
