const db = require("../Models/AdminModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (
      process.env.SUPER_ADMIN_EMAIL == email &&
      process.env.SUPER_ADMIN_PASSWORD == password
    ) {
      const token = createToken(email);
      console.log("datatoken", token);
      res
        .status(200)
        .json({ success: true, message: "super admin login", token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "User not found!!" });
    }
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

module.exports = { loginSuperAdmin };
