const AdminModel = require("../../Models/Admin/AdminModel");
const attendanceRuleModel = require("../../Models/Rota/AttendanceRuleModel");
const SuperAdminModel = require("../../Models/SuperAdmin/SuperAdminModel");
const userModel = require("../../Models/User/userModel");

const postData = async (req, res) => {
  try {
    const { ruleCategory, userIds: dirtyUserIds, dates: dirtyDates } = req.body;
    const userIds = JSON.parse(dirtyUserIds);
    const dates = JSON.parse(dirtyDates);
    for (const userId of userIds) {
      const user = await userModel.findById(userId);
      const exists = await attendanceRuleModel.findOne({ employeeid: userId });
      const rules = dates.map((el) => ({
        date: el,
        ruleCategory,
      }));
      if (!exists) {
        await attendanceRuleModel.create({
          employeeid: userId,
          employeename: user.name,
          rules,
        });
      } else {
        rules.forEach((rule) => exists.rules.push(rule));
        await exists.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Rule Data Added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getData = async (req, res) => {
  const { id } = req.user;
  const admin = await AdminModel.findById(id);
  let isSuperAdmin = false;
  if (!admin) {
    const finalAdmin = await SuperAdminModel.findById(id);
    if (!finalAdmin) {
      return res.status(500).json({ message: "No user" });
    }
    isSuperAdmin = true;
  }
  try {
    const rotaData = await attendanceRuleModel
      .find()
      .populate("employeeid rules.ruleCategory");
    const filtered = isSuperAdmin
      ? rotaData.filter((el) => el.employeeid)
      : rotaData.filter(
        (el) => String(el.employeeid?.branch_id) === String(admin.branch_id)
      );

    res.status(200).json({
      success: true,
      rotaData: filtered,
      message: "Rules Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const checkRule = async (req, res) => {
  const { date } = req.params;
  const { id } = req.user;
  try {
    const rotaData = await attendanceRuleModel
      .findOne({ employeeid: id })
      .populate("employeeid rules.ruleCategory");
    const filtered = rotaData?.rules?.find(
      (el) => date === el.ruleCategory.date
    );
    if (!filtered) {
      throw new Error("NO rota");
    }
    res.status(200).json({
      success: true,
      ruleData: {
        rule: filtered,
        shift: true,
      },
      message: "Rule Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { rules } = req.body;
    const updatedData = await attendanceRuleModel.findByIdAndUpdate(
      id,
      {
        rules: JSON.parse(rules),
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      updatedData,
      message: "Rule Data Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const { rules } = req.body;
    const deletedData = await attendanceRuleModel.findByIdAndUpdate(id, {
      rules: JSON.parse(rules),
    });

    res.status(200).json({
      success: true,
      deletedData,
      message: "Rule Data Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getsingledata = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const data = await attendanceRuleModel.findOne({ employeeid: id });

    if (data) {
      res.status(200).json({
        success: true,
        rotaData: data,
        message: "data found successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        rotaData: data,
        message: "data found not found in rota",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  postData,
  getData,
  updateData,
  deleteData,
  checkRule,
  getsingledata,
};
