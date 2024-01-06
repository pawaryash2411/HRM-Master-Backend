const db = require("../Models/ClientModel");
const bcrypt = require('bcrypt');

const addClient = async (req, res) => {
  const {
    firstName,
    lastName,
    company,
    userName,
    email,
    password,
    phone,
    addressLine1,
    addressLine2,
    city,
    stateProvince,
    zip,
    country
  } = req.body;

  const uploadimg = req.uploadedImageUrl;
  
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const ClientData = new db({
      firstName,
      lastName,
      company,
      userName,
      email,
      password: hashedPassword, 
      phone,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      zip,
      country,
      image: uploadimg,
    });

    const SavedClient = await ClientData.save();
    res.status(200).json({ SavedClient, message: "Client added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add Client", error: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const ClientAllData = await db.find();
    res.status(200).json({ success: true, ClientAllData, message: "All Client Data Fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;

    const ClientData = await db.findById(id);

    res.status(200).json({ success: true, ClientData, message: "Client Single Data Fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await db.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Client Removed successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  addClient,
  getAllData,
  getSingleData,
  deleteData,
};
