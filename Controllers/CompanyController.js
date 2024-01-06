const db = require("../Models/CompanyModel");
const validator = require("validator");
const cloudinary = require("cloudinary").v2;

const getalldata = async (req, res) => {
  try {
    const companydata = await db.find();

    if (!companydata || companydata.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ company: companydata[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addcompany = async (req, res) => {
  const { company_name, email, phone_no, address } = req.body;

  const uploadimg = req.uploadedImageUrl;
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    const exists = await db.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const newCompany = new db({
      company_name,
      email,
      phone_no,
      address,
      logo_img: uploadimg,
    });

    const savedCompany = await newCompany.save();
    res
      .status(200)
      .json({ savedCompany, message: "Company added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add company", error: error.message });
  }
};

const updateuser = async (req, res) => {
  try {
    const uploadedImages = req.uploadedImageUrl;
    const { company_name, email, phone_no, address } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    let logo_img;
    if (req.file) {
      const dataUrl = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUrl);
      logo_img = result.secure_url;
    }

    const updatecompany = await db.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          company_name,
          email,
          phone_no,
          address,
          logo_img,
        },
      }
    );
    res.status(200).json({ message: "company updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update company", error: error.message });
  }
};

module.exports = {
  addcompany,
  getalldata,
  updateuser,
};
