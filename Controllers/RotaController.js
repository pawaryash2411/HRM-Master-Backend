const rotaModal = require("../Models/RotaModel");
const userModel = require("../Models/userModel");

const postData = async (req, res) => {
  try {
    const { rota, userId } = req.body;
    const user = await userModel.findById(userId);
    const exists = await rotaModal.findOne({ employeeid: userId });
    console.log(exists, rota, userId);
    if (!exists) {
      await rotaModal.create({
        employeeid: userId,
        employeename: user.name,
        rota: [{ ...rota }],
      });
      return res.status(201).json({
        success: true,
        message: "Rota Data Added successfully",
      });
    }
    exists.rota.push({ ...rota });
    await exists.save();

    res.status(201).json({
      success: true,
      message: "Rota Data Added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const rotaData = await rotaModal.find();
    res.status(200).json({
      success: true,
      rotaData,
      message: "Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterData = async (req, res) => {
  try {
    const { employeename, starttime, endtime } = req.query;

    const filter = {};
    if (employeename) {
      filter.employeename = employeename;
    }
    if (starttime) {
      filter.starttime = { $gte: new Date(starttime) };
    }
    if (endtime) {
      filter.endtime = { $lte: new Date(endtime) };
    }

    const rotaData = await rotaModal.find(filter);

    res.status(200).json({
      success: true,
      rotaData,
      message: "Filtered Rota Data Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { rota } = req.body;

    const updatedData = await rotaModal.findByIdAndUpdate(
      id,
      {
        rota: JSON.parse(rota),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Rota Data Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const { rota } = req.body;
    const deletedData = await rotaModal.findByIdAndUpdate(id, {
      rota: JSON.parse(rota),
    });

    res.status(200).json({
      success: true,
      deletedData,
      message: "Rota Data Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getsingledata = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const data = await rotaModal.findOne({ employeeid: id });

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
  filterData,
  getsingledata,
};
