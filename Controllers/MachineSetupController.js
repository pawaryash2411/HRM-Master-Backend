const MachineSetupModel = require("../Models/MachineSetupModel");
const ZKLib = require("zklib-birigu");

const postData = async (req, res) => {
  try {
    const {
      // machine_no,
      // machine_type,
      ip_address,
      // serial_no,
      port_no,
      // machine_name,
      // branch_name,
      // timezone,
      // access_control
    } = req.body;
    const machineSetupData = await MachineSetupModel.create({
      // machine_no,
      // machine_type,
      // serial_no,
      port_no,
      // machine_name,
      // branch_name,
      ip_address,
      // timezone,
      // access_control
    });

    res.status(201).json({
      success: true,
      machineSetupData,
      message: "Machine Setup Created successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const machineSetupData = await MachineSetupModel.find();
    res.status(200).json({
      success: true,
      machineSetupData,
      message: "Machine Setup Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      //   machine_no,
      //   machine_type,
      //   serial_no,
      port_no,
      //   machine_name,
      //   branch_name,
      //   timezone,
      //   access_control,
      ip_address,
    } = req.body;

    const updatedData = await MachineSetupModel.findByIdAndUpdate(
      id,
      {
        // machine_no,
        // machine_type,
        // serial_no,
        port_no,
        // machine_name,
        // branch_name,
        // timezone,
        // access_control,
        ip_address,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedData,
      message: "Machine Setup Updated successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await MachineSetupModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      deletedData,
      message: "Machine Setup Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const connectMachineHelper = async (req, res) => {
  const machine = await MachineSetupModel.findOne();

  let zkInstance = new ZKLib(machine.ip_address, +machine.port_no, 5200, 5000);
  return zkInstance;
};

const connectMachine = async (req, res) => {
  try {
    const zkInstance = await connectMachineHelper();

    await zkInstance.createSocket();

    // Get general info like logCapacity, user counts, logs count
    // It's really useful to check the status of device

    console.log("execute", await zkInstance.getInfo());

    res.status(200).json({ message: "succesful" });
    // Get users in machine

    const users = await zkInstance.getUsers();
    console.log(users);

    // Create new user: setUser(uid, userid, name, password, role = 0, cardno = 0)

    // await zkInstance.setUser(12, "9", "testing", "111", 0, 0);

    // You can also read realtime log by getRealTimelogs function

    await zkInstance.getRealTimeLogs((data) => {
      // do something when some checkin
      console.log("realtime", data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const disconnectMachine = async (req, res) => {
  try {
    const zkInstance = await connectMachineHelper();
    await zkInstance.createSocket();
    await zkInstance.disconnect();
    res.json({ message: "Disconnected successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postData,
  getAllData,
  updateData,
  connectMachine,
  deleteData,
  connectMachineHelper,
  disconnectMachine,
};
