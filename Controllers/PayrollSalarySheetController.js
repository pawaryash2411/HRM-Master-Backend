const PayrollHourlyModel = require("../Models/PayrollHourlyModel");
const PayrollMonthlyModel = require("../Models/PayrollMonthlyModel");
const db = require("../Models/PayrollMonthlyModel");

const getAllData = async (req, res) => {
  try {
    const PayrollHourly = await PayrollHourlyModel.find();
    const PayrollMonthly = await PayrollMonthlyModel.find();

    res.status(200).json({
      success: true,
      PayrollMonthly,
      PayrollHourly,
      message: "All Payroll Monthly Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllData,
};
