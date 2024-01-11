const db = require("../Models/PayrollHourlyModel");

const postData = async (req, res) => {
  try {
    const { id: adminid } = req.user;
    const { pay_grade_name, hourly_rate } = req.body;

    const PayrollHourlyData = await db.create({
      adminid,
      pay_grade_name,
      hourly_rate,
    });

    res.status(201).json({
      success: true,
      PayrollHourlyData,
      message: "Payroll Hourly Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const PayrollAllData = await db.find();
    res.status(200).json({
      success: true,
      PayrollAllData,
      message: "All Payroll Hourly Data Fetched successfully",
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
      message: "Payroll Hourly Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { pay_grade_name, hourly_rate } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        pay_grade_name,
        hourly_rate,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "PayrollHourly data Updated successfully",
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
      message: "Payroll Hourly data Removed successfully",
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
