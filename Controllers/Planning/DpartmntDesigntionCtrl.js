const db = require("../../Models/Planning/DpartmntDesigntionModel");

const getalldata = async (req, res) => {
  try {
    const result = await db.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const postdata = async (req, res) => {
  const {
    department,
    childDepartmentId,
    childDepartment,
    departmentId,
    independent,
  } = req.body;
  try {
    if (!childDepartmentId && !departmentId) {
      const data = await db.create({
        department,
        independent,
      });
      return res
        .status(201)
        .json({ data, message: "Department added successfully" });
    }
    if (departmentId && !childDepartmentId) {
      const data = await db.findByIdAndUpdate(departmentId, {
        department,
        independent,
      });
      return res
        .status(201)
        .json({ data, message: "Department added successfully" });
    }
    if (departmentId && childDepartmentId) {
      const data = await db.findByIdAndUpdate(childDepartmentId, {
        childDepartment: JSON.parse(childDepartment),
      });
      return res
        .status(201)
        .json({ data, message: "Department added successfully" });
    }

    if (childDepartmentId) {
      const data = await db.findByIdAndUpdate(childDepartmentId, {
        $push: { childDepartment: { $each: JSON.parse(childDepartment) } },
      });
      res.status(201).json({ data, message: "Department added successfully" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const putdata = async (req, res) => {
  const { department, designations } = req.body;
  console.log(department, JSON.parse(designations), req.params.id);
  try {
    let result = await db.findByIdAndUpdate(
      req.params.id,
      {
        department,
        designations: JSON.parse(designations),
      },
      { new: true }
    );
    res.status(200).json({ result, message: "Update successful" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deletedata = async (req, res) => {
  try {
    let result = await db.findByIdAndDelete(req.params.id);
    res.status(200).json({ result, message: "Delete successful" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getalldata, postdata, putdata, deletedata };
