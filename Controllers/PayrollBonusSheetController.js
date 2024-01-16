const db = require("../Models/PayrollBonusSheetModel.js");

const postData = async (req, res) => {
  try {
    const { id: userid } = req.params;
    const { bonusid } = req.body;

    const bonusData = await db.create({
      userid,
      bonusid: JSON.parse(bonusid),
    });

    res.status(201).json({
      success: true,
      bonusData,
      message: "Payroll bonus Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const BonusAllData = await db.find().populate({
      path: "bonusid userid",
      // path: "userid",
      // populate: {
      populate: {
        path: "monthly_pay_grade",
      },
      // },
    });
    res.status(200).json({
      success: true,
      BonusAllData,
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
};
