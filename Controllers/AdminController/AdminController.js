const db = require("../../Models/AdminModel/AdminModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createadmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
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

    const newUser = new db({
      email,
      password: hashedPassword,
    });

    const createadmin = await newUser.save();
    res.status(200).json({ createadmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const admindata = await db.findOne().populate("leave");
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

module.exports = { createadmin, loginadmin, createnotification, getadmin };
