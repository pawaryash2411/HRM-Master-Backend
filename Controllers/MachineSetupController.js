const MachineSetupModel = require("../Models/MachineSetupModel");
const ZKLib = require("zklib-birigu");
const RotaModel = require("../Models/Rota/RotaModel");
const db = require("../Models/Clock/Clockin-OutModel");
const {
  updateTimeWithToday,
  calculateTimeDifference,
} = require("./Clock/ClockIn-OutCtrl");
const UserTimeRegistor = require("../Models/User/UserTimeRegistor");

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

    await zkInstance.getRealTimeLogs(async (data) => {
      // do something when some checkin
      try {
        const { userId: machineId, attTime } = data;
        const user = await userModel.findOne({ user_id: machineId });
        console.log(user);
        if (!user) {
          throw new Error("Not valid");
        }
        const userId = user._id;
        const currentTime = new Date(attTime);
        const alreadyClockedIn = await db.findOne({ userid: user._id });

        if (!alreadyClockedIn) {
          if (user.shift) {
            const rotaData = await RotaModel.findOne({
              employeeid: userId,
            }).populate("rota.shift");
            temp = rotaData?.rota?.find(
              (el) => el.date === time.split("T").at(0)
            );
            if (!temp) throw new Error("No shift today");
            const checkInTime = updateTimeWithToday(
              temp.shift.allowCheckInTime,
              time
            );
            const checkOutTime = updateTimeWithToday(
              temp.shift.allowCheckOutTime,
              currentTime,
              temp.shift.overnight
            );
            console.log(currentTime, checkOutTime, checkInTime);
            if (!(currentTime >= checkInTime && currentTime <= checkOutTime)) {
              throw new Error("No shift");
            }
          } else {
            const ruleData = await AttendanceRuleModel.findOne({
              employeeid: userId,
            }).populate("rules.ruleCategory");
            temp = ruleData.rules?.find(
              (el) => el.date === time.split("T").at(0)
            );
            if (!temp) throw new Error("Not assigned to work today");
            const checkInTime = updateTimeWithToday(
              temp.ruleCategory.allowCheckInTime,
              time
            );
            const checkOutTime = updateTimeWithToday(
              temp.ruleCategory.allowCheckOutTime,
              time,
              temp.ruleCategory.overnight
            );
            if (!(currentTime >= checkInTime && currentTime <= checkOutTime)) {
              throw new Error(
                "You missed today's checkin time. Please confirm it."
              );
            }
          }
          await db.create({
            userid: user._id,
            time: currentTime.toISOString(),
            browserName: "ZK device",
            platform: "ZK device",
            isMobile: false,
          });
        }
        if (alreadyClockedIn) {
          const { time, browserName, platform, isMobile } = alreadyClockedIn;

          // Find or create the UserTimeRegistorData
          let userTimeRegistorData = await UserTimeRegistor.findOne({
            userid: user._id,
          });
          let isShiftEmployee = false,
            nowRota;
          if (user.shift) {
            isShiftEmployee = true;
            const rotaData = await RotaModel.findOne({
              employeeid: user._id,
            }).populate("rota.shift");
            if (!rotaData) throw new Error("You dont't have a shift.");
            temp = rotaData.rota.find(
              (el) => el.date === clockouttime.split("T").at(0)
            );
            if (temp) {
              nowRota = {
                date: temp.date,
                allowCheckInTime: temp.shift.allowCheckInTime,
                allowCheckOutTime: temp.shift.allowCheckOutTime,
                overnight: temp.shift.overnight,
                checkInTime: temp.shift.checkInTime,
                checkOutTime: temp.shift.checkOutTime,
              };
            }
          } else {
            const ruleData = await AttendanceRuleModel.findOne({
              employeeid: finalUser._id,
            }).populate("rules.ruleCategory");
            if (!ruleData)
              throw new Error("You are not supposed to work today??");
            temp = ruleData.rules.find(
              (el) => el.date === clockouttime.split("T").at(0)
            );
            if (temp) {
              nowRota = {
                date: temp.date,
                allowCheckInTime: temp.ruleCategory.allowCheckInTime,
                allowCheckOutTime: temp.ruleCategory.allowCheckOutTime,
                overnight: temp.ruleCategory.overnight,
              };
            }
          }
          if (!userTimeRegistorData) {
            userTimeRegistorData = new UserTimeRegistor({
              userid: finalUser._id,
              branch_id,
              isShiftEmployee,
              clock: [],
            });
          }
          const { hours, minutes, seconds } = calculateTimeDifference(
            time,
            clockouttime
          );
          userTimeRegistorData.userid = user._id;
          userTimeRegistorData.isShiftEmployee = isShiftEmployee;
          userTimeRegistorData.clock.push({
            clockInDetails: { time, browserName, platform, isMobile },
            clockouttime,
            shiftDetail: nowRota,
            totaltime: `${hours}:${minutes}:${seconds}`,
          });

          await userTimeRegistorData.save();

          // Remove the user data
          await db.findOneAndDelete({
            userid: finalUser._id,
          });
        }
      } catch (err) {
        console.log(err);
      }
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
    res.status(200).json({ message: "Disconnected successfully" });
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
