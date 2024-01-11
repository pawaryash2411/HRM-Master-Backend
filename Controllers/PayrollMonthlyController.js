const db = require("../Models/PayrollMonthlyModel");

const postData = async (req, res) => {
  try {
    const { id: adminid } = req.user;
    const {
      pay_grade_name,
      gross_salary,
      percentange_of_basic,
      basic_salary,
      allowance,
      deduction,
      overtime_rate,
    } = req.body;

    const PayrollMonthlyData = await db.create({
      adminid,
      pay_grade_name,
      gross_salary,
      percentange_of_basic,
      basic_salary,
      allowance,
      deduction,
      overtime_rate,
    });

    res.status(201).json({
      success: true,
      PayrollMonthlyData,
      message: "Payroll monthly Created successfully",
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
      message: "All Payroll Monthly Data Fetched successfully",
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
      message: "Payroll Monthly Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pay_grade_name,
      gross_salary,
      percentange_of_basic,
      basic_salary,
      allowance,
      deduction,
      overtime_rate,
    } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        pay_grade_name,
        gross_salary,
        percentange_of_basic,
        basic_salary,
        allowance,
        deduction,
        overtime_rate,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Payrollmonthly data Updated successfully",
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
      message: "Payroll monthly data Removed successfully",
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
