const db = require("../../Models/AdminModel/AdminModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const branchModel = require("../../Models/BranchModel/branchModel");                  

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
      return res.status(400).json({ message: "admin already exists" });
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
      location,
      password,
    });

    const AdminRegister = await newAdmin.save();
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
    const admindata = await db.find().populate("leave").populate("branch_id");
    console.log(admindata);
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

const addbranch = async (req, res) => {
  try {
    const admindata = await db.findById(req.body.id);

    const branchdata = new branchModel({
      branch_name: req.body.branch_name,
      location: req.body.location,
      admin_id: admindata._id,
    });

    let data = await branchdata.save();

    const adminupdate = await db.findByIdAndUpdate(req.body.id, {
      branch_id: data._id,
    });

    console.log(adminupdate);
    res.status(200).send({
      success: true,
      adminupdate,
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
    const admindata = await db.findById(req.body.id);

    const branchData = branchModel.findByIdAndUpdate(
      branchId,
      {
        branch_name: req.body.branch_name,
        location: req.body.location,
        admin_id: admindata._id,
      },
      { new: true }
    );

    let data = await branchData.save();

    admindata.branch_id = data._id;
    await admindata.save();
    res.status(200).send({
      success: true,
      branch: branchData,
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
    location,
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
          email,
          location,
          password,
        },
      }
    );
    res.status(200).json({ success: true, message: "update staff" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
};
