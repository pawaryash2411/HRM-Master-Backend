const SuperAdminModel = require("../../Models/SuperAdmin/SuperAdminModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

const registerSuperAdmin = async (req, res) => {
  try {
    const { email, password, defaultRoles, expiryDate, allowedDevices } =
      req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const userExists = await SuperAdminModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAdmin = await SuperAdminModel.create({
      email,
      password,
      defaultRoles: JSON.parse(defaultRoles),
      expiryDate,
      allowedDevices,
    });

    res
      .status(200)
      .json({ success: true, admin: newAdmin, message: "Admin Created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    await SuperAdminModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
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
const loginsuperadmin = async (req, res) => {
  const { email, password } = req.body;
  const ip = req.headers["x-forwarded-for"]?.split(",")?.at(0);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(superAdmin._id);
    if (!ip || ip.length === 0) {
      return res.status(200).json({ admin, token, role: "Super Admin" });
    }

    const alreadyPresent = superAdmin.loggedIps.some((el) => el === ip);
    if (alreadyPresent)
      return res.status(200).json({ admin, token, role: "Super Admin" });
    if (!alreadyPresent) {
      const allowed = superAdmin.allowedDevices;
      if (allowed >= superAdmin.loggedIps.length) {
        throw new Error("Reached max limit");
      } else {
        superAdmin.loggedIps.push(ip);
        await superAdmin.save();
        return res.status(200).json({ admin, token, role: "Super Admin" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await SuperAdminModel.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "internal server Error" + error });
  }
};
const getSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdminModel.find();

    res.status(200).send({
      success: true,
      superAdmin,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "internal server Error" + error });
  }
};
module.exports = {
  registerSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
  loginsuperadmin,
  getSuperAdmin,
};
