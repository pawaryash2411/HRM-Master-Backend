const db = require("../Models/PayrollModel");

const postData = async (req, res) => {
  try {
    const { id: adminid } = req.user;
    const {
      allowance,

      allowance_name,
      allowance_type,
      percentange_of_basic,
      limit_per_month,
    } = req.body;

    const Projectsdata = await db.create({
      adminid,
      allowance,
      allowance_name,
      allowance_type,
      percentange_of_basic,
      limit_per_month,
    });

    res.status(201).json({
      success: true,
      Projectsdata,
      message: " payroll Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const ProjectsAllData = await db.find();
    res.status(200).json({
      success: true,
      ProjectsAllData,
      message: "All Payroll Data Fetched successfully",
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
      message: "Payroll Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      allowance,
      allowance_name,
      allowance_type,
      percentange_of_basic,
      limit_per_month,
    } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        allowance,
        allowance_name,
        allowance_type,
        percentange_of_basic,
        limit_per_month,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "payroll Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    await db.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "payroll Removed successfully" });
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
