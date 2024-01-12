const db = require("../Models/AwardModel");
const validator = require("validator");
const cloudinary = require("cloudinary").v2;

const addAward = async (req, res) => {
  const {
    company,
    department,
    employee,
    awardType,
    gift,
    cash,
    awardInformation,
    awardDate
  } = req.body;

  const uploadimg = req.uploadedImageUrl;
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const AwardData = new db({
      company,
      department,
      employee,
      awardType,
      gift,
      cash,
      awardInformation,
      awardDate,
      awardPhoto: uploadimg,
    });

    const SavedAward = await AwardData.save();
    res.status(200).json({ SavedAward, message: "Award added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Award", error: error.message });
  }
};



const getAllData = async (req, res) => {
  try {
    const awardAllData = await db.find();
    res.status(200).json({ success: true, awardAllData, message: "All Award Data Fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;

    const awardData = await db.findById(id);

    res.status(200).json({ success: true, awardData, message: "Award Single Data Fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await db.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Award Removed successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const updateuser = async (req, res) => {
  try {
    const uploadedImages = req.uploadedImageUrl;
    const {
      company,
      department,
      employee,
      awardType,
      gift,
      cash,
      awardInformation,
      awardDate
    } = req.body;
    let awardPhoto;
    if (req.file) {
      const dataUrl = `data:${req.file.mimetype
        };base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUrl);
      awardPhoto = result.secure_url;
    }

    const updatedAward = await db.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          company,
          department,
          employee,
          awardType,
          gift,
          cash,
          awardInformation,
          awardDate,
          awardPhoto
        },
      }
    );
    res.status(200).json({ success: true, updatedAward, message: "Award updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update Award", error: error.message });
  }
};

module.exports = {
  addAward,
  getAllData,
  getSingleData,
  deleteData,
  updateuser,
};
