const db = require("../../Models/PlanningModel/DpartmntDesigntionModel");

const getalldata = async (req, res) => {
  try {
    const result = await db.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const postdata = async (req, res) => {
  const { designations, department } = req.body;
  try {
    const data = await db.create({
      designations: JSON.parse(designations),
      department,
    });
    res.status(201).json({ data, message: "Designation added successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const putdata = async (req, res) => {
  const { department, designations } = req.body;
  try {
    let result = await db.findByIdAndUpdate(req.params.id, {
      department,
      designations,
    });
    res.status(200).json({ result, message: "Delete successful" });
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
