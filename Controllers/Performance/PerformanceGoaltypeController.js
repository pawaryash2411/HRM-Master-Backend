const db = require("../../Models/Performance/PerformanceGoaltrackingModel");

const postData = async (req, res) => {
  try {
    const { id: adminid } = req.user;
    const { goal_type } = req.body;
    const performancedata = await db.create({
      adminid,
      goal_type,
    });

    res.status(201).json({
      success: true,
      performancedata,
      message: " performance Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const performanceAllData = await db.find();
    res.status(200).json({
      success: true,
      performanceAllData,
      message: "All performance Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;

    const performanceData = await db.findById(id);

    res.status(200).json({
      success: true,
      performanceData,
      message: "performance Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_type } = req.body;
    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        $set: {
          goal_type,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "performance Updated successfully",
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
      .json({ success: true, message: "performance Removed successfully" });
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
