const db = require("../Models/PayrollBonusModel.js");

const postData = async (req, res) => {
  try {
    const { id: adminid } = req.user;
    const { festival_name, bonus_based_on, percentange_of_bonus } = req.body;

    const PayrollData = await db.create({
      adminid,
      festival_name,
      bonus_based_on,
      percentange_of_bonus,
    });

    res.status(201).json({
      success: true,
      PayrollData,
      message: "Payroll bonus Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const PayrollAllData = await db.find().populate("adminid");
    res.status(200).json({
      success: true,
      PayrollAllData,
      message: "All Payroll bonus Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;

    const PayrollData = await db.findById(id);

    res.status(200).json({
      success: true,
      PayrollData,
      message: "Payroll bonus Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { festival_name, bonus_based_on, percentange_of_bonus } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        festival_name,
        bonus_based_on,
        percentange_of_bonus,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Payroll bonus Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    await db.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Payroll bonus Removed successfully",
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
  getSingleData,
};
