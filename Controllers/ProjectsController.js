const AdminModel = require("../Models/Admin/AdminModel");
const db = require("../Models/ProjectsModel");
const userModel = require("../Models/User/userModel");

const postData = async (req, res) => {
  try {
    const { title, cost, startDate, endDate, priority, summary, employeeId } =
      req.body;
    const admin = await AdminModel.findById(req.user.id);
    const ProjectData = await db.create({
      title,
      cost,
      startDate,
      endDate,
      branch_id: admin.branch_id,
      priority,
      summary,
      employeeId,
    });

    res.status(201).json({
      success: true,
      ProjectData,
      message: " Projects Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    let branch_id;
    const user = await userModel.findById(req.user.id);
    if (!user) {
      const admin = await AdminModel.findById(req.user.id);
      if (!admin) {
        throw new Error("Not found");
      }
      branch_id = admin.branch_id;
    } else {
      branch_id = user.branch_id;
    }
    const ProjectsAllData = await db.find({ branch_id }).populate("employeeId");
    const filteredProjects = user
      ? ProjectsAllData.filter((el) =>
        el.employeeId.some(
          (employee) => String(employee._id) === String(user._id)
        )
      )
      : ProjectsAllData;
    res.status(200).json({
      success: true,
      ProjectsAllData: filteredProjects,
      message: "All Projects Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("pass an id");
    const ProjectsData = await db.findById(id);

    res.status(200).json({
      success: true,
      ProjectsData,
      message: "Projects Single Data Fetched successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      cost,
      startDate,
      endDate,
      priority,
      summary,
      employeeId,
    } = req.body;

    const updatedData = await db.findByIdAndUpdate(
      id,
      {
        title,
        cost,
        startDate,
        endDate,
        priority,
        summary,
        employeeId,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Projects Updated successfully",
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
      .json({ success: true, message: "Projects Removed successfully" });
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
