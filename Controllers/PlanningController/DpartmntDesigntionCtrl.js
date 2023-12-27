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
    res.status(201).json({ message: "Designation added successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const putdata = async (req, res) => {
  try {
    let result = await db.updateMany(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).JSON.parse(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deletedata = async (req, res) => {
  try {
    let result = await db.deleteMany(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getalldata, postdata, putdata, deletedata };
