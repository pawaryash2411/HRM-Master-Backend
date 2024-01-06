const db = require("../Models/HolidayModel");

const getalldata = async (req, res) => {
  try {
    const result = await db.find();
    res.status(200).json({success: true, result });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const postdata = async (req, res) => {
  const { title, start_date, end_date } = req.body;
  try {
    const data = await db.create({
        title,
        start_date,
        end_date
    });
    res.status(201).json({
        success: true,
        message: 'Data created successfully',
        data
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getalldata, postdata};
