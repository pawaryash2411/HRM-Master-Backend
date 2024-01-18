const AdminModel = require("../../Models/Admin/AdminModel");
const db = require("../../Models/LeaveManagement/LeaveCategoryModel");
const userModel = require("../../Models/User/userModel");

const getAllData = async (req, res) => {
  try {
    allData = await db.find();
    res.status(200).json({
      success: true,
      allData,
      message: "AllLeave Category Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postData = async (req, res) => {
  try {
    const { title, total_days, paid } = req.body;
    console.log(paid);
    const lastModifiedDate = new Date();

    const createdData = await db.create({
      title,
      total_days,
      lastModifiedDate,
      paid,
    });

    res.status(201).json({
      success: true,
      createdData,
      message: "Leave Category Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, total_days, paid } = req.body;
    let lastModifiedDate = new Date();

    if (title || total_days) {
      lastModifiedDate = new Date();
    }

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        title,
        total_days,
        lastModifiedDate,
        paid,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Leave Category Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await db.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      deletedData,
      message: "Rota Data Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  postData,
  getAllData,
  updateData,
  deleteData,
};
