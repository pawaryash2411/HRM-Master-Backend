const db = require("../Models/PayrollBonusSheetModel.js");

const postData = async (req, res) => {
  try {
    const { id: userid } = req.params;
    const { bonusid } = req.body;

    const PayrollData = await db.create({
      userid,
      bonusid: JSON.parse(bonusid),
    });

    res.status(201).json({
      success: true,
      bonusdata: PayrollData,
      message: "Payroll bonus Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const PayrollAllData = await db.find().populate({
      path: "bonusid",
      populate: {
        path: "userid",
        populate: {
          path: "monthly_pay_grade",
        },
      },
    });
    res.status(200).json({
      success: true,
      bonusdata: PayrollAllData,
      message: "All Payroll bonus Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { bonusid } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        bonusid: JSON.parse(bonusid),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedBonus: updatedData,
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
};
