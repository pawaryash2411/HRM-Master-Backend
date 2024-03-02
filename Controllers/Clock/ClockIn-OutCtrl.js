const db = require("../../Models/Clock/Clockin-OutModel");

const fetch = require("node-fetch");
const axios = require("axios");
const UserTimeRegistor = require("../../Models/User/UserTimeRegistor");
const userModel = require("../../Models/User/userModel");
const AdminModel = require("../../Models/Admin/AdminModel");
const RotaModel = require("../../Models/Rota/RotaModel");
const AttendanceRuleModel = require("../../Models/Rota/AttendanceRuleModel");
const apiKey = "AIzaSyBpcBi67uEbAIQTdShuxektx1E_v38CTHI";
const address = "tajmahal";
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  address
)}&key=${apiKey}`;

function updateTimeWithToday(isoString, referenceDate, overNight) {
  const previousDate = new Date(isoString);
  const currentTime = previousDate.toTimeString().substring(0, 8); // Extracting time HH:mm:ss from previous date

  const today = new Date(referenceDate); // Current date
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = overNight ? today.getDate() + 1 : today.getDate();

  // Constructing the new date with today's date and the time from the previous date
  const newDate = new Date(
    `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}T${currentTime}`
  );

  return newDate;
}
function calculateTimeDifference(time1, time2) {
  // Parse the time strings into Date objects
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  console.log(date1, date2);
  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(date2 - date1);

  // Convert the time difference to hours, minutes, and seconds
  const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
  const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
  const seconds = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

  return {
    hours,
    minutes,
    seconds,
  };
}

const getlocation = (req, res) => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log("Latitude:", location.lat);
        console.log("Longitude:", location.lng);

        const latitude = location.lat;
        const longitude = location.lng;

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
          .then((response) => {
            const locationData = response.data;
            console.log(locationData);
            // Process locationData here
            res.send(locationData); // Send location data as response to the client
          })
          .catch((error) => {
            console.log("Error fetching location:", error);
            res.status(500).send("Error fetching location");
          });
      } else {
        console.log("Error:", data.status);
        res.status(500).send("Error fetching address");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    });
};

//----------------------------------------

const postdata = async (req, res) => {
  try {
    let userid;
    let adminid;
    const { id: userId } = req.user;

    let finalUser;
    const user = await userModel.findById(userId);
    if (!user) {
      finalUser = await AdminModel.findById(userId);
    } else {
      finalUser = user;
    }
    console.log(finalUser.role);
    // console.log(userid, finalUser);
    const { time } = req.body;
    // console.log(time, userid);
    const headers = req?.headers;
    // Extract browser name
    // console.log(headers);
    const userAgent = headers["sec-ch-ua"];
    const browserName = userAgent
      ?.split(",")
      ?.at(2)
      ?.split(";")[0]
      ?.slice(2, -1);

    // Extract platform
    const platform = headers["sec-ch-ua-platform"]?.replace(/"/g, "");

    // Check if it's a mobile device
    const isMobile = headers["sec-ch-ua-mobile"] === "?1" ? true : false;

    if (finalUser.role == undefined) {
      adminid = userId;
      userid = null;
    } else {
      userid = userId;
      adminid = null;
    }

    const newData = await db.create({
      userid,
      adminid,
      time,
      browserName,
      platform,
      isMobile,
    });
    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const putdata = async (req, res) => {
  try {
    let userid;
    let adminid, branch_id;
    const { id: userId } = req.user;
    const { clockouttime, totaltime } = req.body;

    let finalUser;
    const user = await userModel.findById(userId);
    if (!user) {
      finalUser = await AdminModel.findById(userId);
      branch_id = finalUser.branch_id;
    } else {
      finalUser = user;
      branch_id = user.branch_id;
    }
    if (finalUser.role == undefined) {
      adminid = userId;
      userid = null;
    } else {
      userid = userId;
      adminid = user.adminId;
    }
    // Find the user data based on userid or adminid
    const userdata = await db.findOne({
      $or: [{ userid: userId }, { adminid: userId }],
    });

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    const { time, browserName, platform, isMobile } = userdata;

    // Find or create the UserTimeRegistorData
    let userTimeRegistorData = await UserTimeRegistor.findOne({
      $or: [{ userid: userId }, { adminid: userId }],
    });
    let isShiftEmployee = false,
      nowRota;
    if (user.shift) {
      isShiftEmployee = true;
      const rotaData = await RotaModel.findOne({ employeeid: userId }).populate(
        "rota.shift"
      );
      temp = rotaData?.rota?.find(
        (el) => el.date === clockouttime.split("T").at(0)
      );
      console.log(temp);
      if (temp) {
        nowRota = {
          date: temp.date,
          allowCheckInTime: temp.shift.allowCheckInTime,
          allowCheckOutTime: temp.shift.allowCheckOutTime,
          overnight: temp.shift.overnight,
        };
      }
    } else {
      const ruleData = await AttendanceRuleModel.findOne({
        employeeid: userId,
      }).populate("rules.ruleCategory");
      temp = ruleData.rules?.find(
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
    console.log(nowRota, "now");
    if (!userTimeRegistorData) {
      userTimeRegistorData = new UserTimeRegistor({
        userid,
        adminid,
        branch_id,
        isShiftEmployee,
        clock: [],
      });
    }

    userTimeRegistorData.userid = userid;
    userTimeRegistorData.adminid = adminid;
    userTimeRegistorData.isShiftEmployee = isShiftEmployee;
    // Push clock data to UserTimeRegistorData
    userTimeRegistorData.clock.push({
      clockInDetails: { time, browserName, platform, isMobile },
      clockouttime,
      shiftDetail: nowRota,
      totaltime,
    });

    await userTimeRegistorData.save();

    // Remove the user data
    const removedata = await db.findOneAndDelete({
      $or: [{ userid }, { adminid: userid }],
    });

    if (removedata) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({
        success: false,
        message: "No document found for the given userid.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const postdataAdmin = async (req, res) => {
  try {
    let userid;
    let adminid;
    const { id: userId } = req.params;

    let finalUser;
    const user = await userModel.findById(userId);
    if (!user) {
      finalUser = await AdminModel.findById(userId);
    } else {
      finalUser = user;
    }
    console.log(finalUser.role);
    // console.log(userid, finalUser);
    const { time } = req.body;
    // console.log(time, userid);
    const headers = req?.headers;
    // Extract browser name
    // console.log(headers);
    const userAgent = headers["sec-ch-ua"];
    const browserName = userAgent
      ?.split(",")
      ?.at(2)
      ?.split(";")[0]
      ?.slice(2, -1);

    // Extract platform
    const platform = headers["sec-ch-ua-platform"]?.replace(/"/g, "");

    // Check if it's a mobile device
    const isMobile = headers["sec-ch-ua-mobile"] === "?1" ? true : false;

    if (finalUser.role == undefined) {
      adminid = userId;
      userid = null;
    } else {
      userid = userId;
      adminid = null;
    }

    const newData = await db.create({
      userid,
      adminid,
      time,
      browserName,
      platform,
      isMobile,
    });
    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const postdataQR = async (req, res) => {
  try {
    let adminid;
    const { machineId, time } = req.body;

    const user = await userModel.findOne({ card_no: machineId });
    if (!user) {
      throw new Error("Not valid");
    }
    const userId = user._id;
    const currentTime = new Date();
    const already = await db.findOne({ userid: user._id });
    if (already) {
      throw new Error("Already clocked in");
    }
    if (user.shift) {
      const rotaData = await RotaModel.findOne({ employeeid: userId }).populate(
        "rota.shift"
      );
      temp = rotaData?.rota?.find((el) => el.date === time.split("T").at(0));
      if (!temp) throw new Error("No shift today");
      const checkInTime = updateTimeWithToday(
        temp.shift.allowCheckInTime,
        time
      );
      const checkOutTime = updateTimeWithToday(
        temp.shift.allowCheckOutTime,
        time,
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
      temp = ruleData.rules?.find((el) => el.date === time.split("T").at(0));
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
        throw new Error("You missed today's checkin time. Please confirm it.");
      }
    }

    // Define check-in and check-out times

    const headers = req?.headers;
    // Extract browser name
    // console.log(headers);
    const userAgent = headers["sec-ch-ua"];
    const browserName = userAgent
      ?.split(",")
      ?.at(2)
      ?.split(";")[0]
      ?.slice(2, -1);

    // Extract platform
    const platform = headers["sec-ch-ua-platform"]?.replace(/"/g, "");

    // Check if it's a mobile device
    const isMobile = headers["sec-ch-ua-mobile"] === "?1" ? true : false;

    const newData = await db.create({
      userid: user._id,
      adminid,
      time,
      browserName,
      platform,
      isMobile,
    });
    await res.status(200).json({ newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const putdataQR = async (req, res) => {
  try {
    const { clockouttime, machineId } = req.body;

    const finalUser = await userModel.findOne({ card_no: machineId });
    const branch_id = finalUser.branch_id;
    const userdata = await db.findOne({
      userid: finalUser._id,
    });

    if (!userdata) {
      throw new Error("You are not clocked in curerntly");
    }

    const { time, browserName, platform, isMobile } = userdata;

    // Find or create the UserTimeRegistorData
    let userTimeRegistorData = await UserTimeRegistor.findOne({
      userid: finalUser._id,
    });
    let isShiftEmployee = false,
      nowRota;
    if (finalUser.shift) {
      isShiftEmployee = true;
      const rotaData = await RotaModel.findOne({
        employeeid: finalUser._id,
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
        };
      }
    } else {
      const ruleData = await AttendanceRuleModel.findOne({
        employeeid: finalUser._id,
      }).populate("rules.ruleCategory");
      if (!ruleData) throw new Error("You are not supposed to work today??");
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
    console.log(nowRota);
    userTimeRegistorData.userid = finalUser._id;
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const putdataAdmin = async (req, res) => {
  try {
    let userid;
    let adminid, branch_id;
    const { id: userId } = req.params;
    const { clockouttime } = req.body;
    const rotaData = await RotaModel.findOne({ employeeid: userId });
    const nowRota = rotaData.rota.find(
      (el) => el.date === clockouttime.split("T").at(0)
    );
    console.log(nowRota);

    let finalUser;
    const user = await userModel.findById(userId);
    if (!user) {
      finalUser = await AdminModel.findById(userId);
      branch_id = finalUser.branch_id;
    } else {
      finalUser = user;
      branch_id = user.branch_id;
    }
    if (finalUser.role == undefined) {
      adminid = userId;
      userid = null;
    } else {
      userid = userId;
      adminid = user.adminId;
    }
    // Find the user data based on userid or adminid
    const userdata = await db.findOne({
      $or: [{ userid: userId }, { adminid: userId }],
    });

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    const { time, browserName, platform, isMobile } = userdata;

    // Find or create the UserTimeRegistorData
    let userTimeRegistorData = await UserTimeRegistor.findOne({
      $or: [{ userid: userId }, { adminid: userId }],
    });

    if (!userTimeRegistorData) {
      userTimeRegistorData = new UserTimeRegistor({
        userid,
        adminid,
        branch_id,
        clock: [],
      });
    }

    userTimeRegistorData.userid = userid;
    userTimeRegistorData.adminid = adminid;
    const { hours, minutes, seconds } = calculateTimeDifference(
      time,
      clockouttime
    );
    // Push clock data to UserTimeRegistorData
    userTimeRegistorData.clock.push({
      clockInDetails: { time, browserName, platform, isMobile },
      clockouttime,
      shiftDetail: nowRota,
      totaltime: `${hours}:${minutes}:${seconds}`,
    });

    await userTimeRegistorData.save();

    // Remove the user data
    const removedata = await db.findOneAndDelete({
      $or: [{ userid }, { adminid: userid }],
    });

    if (removedata) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({
        success: false,
        message: "No document found for the given userid.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getdata = async (req, res) => {
  try {
    const getalldata = await db.find();
    res.status(200).json(getalldata);
  } catch (error) {
    console.error(error);
  }
};

const getsingle = async (req, res) => {
  try {
    const getsingledata = await db.findOne({ userid: req.user.id });
    if (getsingledata) {
      res.status(200).json({ clockedIn: true, clockIn: getsingledata });
    } else {
      const getSingle = await db.findOne({ adminid: req.user.id });
      if (!getSingle) {
        res.status(200).json({ clockedIn: false });
      }
      res.status(200).json({ clockedIn: true, clockIn: getSingle });
    }
  } catch (error) {
    console.error(error);
  }
};
const getsingleAdmin = async (req, res) => {
  try {
    const getsingledata = await db.findOne({ userid: req.params.id });
    if (getsingledata) {
      res.status(200).json({ clockedIn: true, clockIn: getsingledata });
    } else {
      const getSingle = await db.findOne({ adminid: req.user.id });
      if (!getSingle) {
        return res.status(200).json({ clockedIn: false });
      }
      res.status(200).json({ clockedIn: true, clockIn: getSingle });
    }
  } catch (error) {
    console.error(error);
  }
};

const postClockInOut = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { time, clockouttime, shiftId, remarks } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User doesnt exist");
    }
    let nowRota;
    if (user.shift) {
      const rotaData = await RotaModel.findOne({ employeeid: userId }).populate(
        "rota.shift"
      );
      const {
        date,
        shift: { allowCheckInTime, allowCheckOutTime, overnight },
      } = rotaData.rota.find((el) => String(el._id) === String(shiftId));
      nowRota = { date, allowCheckInTime, allowCheckOutTime, overnight };
    }
    if (!user.shift) {
      const rotaData = await AttendanceRuleModel.findOne({
        employeeid: userId,
      }).populate("rules.ruleCategory");
      const {
        date,
        ruleCategory: { allowCheckInTime, allowCheckOutTime, overnight },
      } = rotaData.rules.find((el) => String(el._id) === String(shiftId));
      nowRota = { date, allowCheckInTime, allowCheckOutTime, overnight };
    }
    console.log("nowRota", nowRota);

    const branch_id = user.branch_id;

    const headers = req?.headers;
    // Extract browser name
    // console.log(headers);
    const userAgent = headers["sec-ch-ua"];
    const browserName = userAgent
      ?.split(",")
      ?.at(2)
      ?.split(";")[0]
      ?.slice(2, -1);

    // Extract platform
    const platform = headers["sec-ch-ua-platform"]?.replace(/"/g, "");

    // Check if it's a mobile device
    const isMobile = headers["sec-ch-ua-mobile"] === "?1" ? true : false;

    // Find or create the UserTimeRegistorData
    let userTimeRegistorData = await UserTimeRegistor.findOne({
      userid: userId,
    });

    if (!userTimeRegistorData) {
      userTimeRegistorData = new UserTimeRegistor({
        userid: userId,
        branch_id,
        clock: [],
      });
    }

    userTimeRegistorData.userid = userId;
    userTimeRegistorData.branch_id = branch_id;
    const { hours, minutes, seconds } = calculateTimeDifference(
      time,
      clockouttime
    );
    // Push clock data to UserTimeRegistorData
    userTimeRegistorData.clock.push({
      clockInDetails: { time, browserName, platform, isMobile },
      clockouttime,
      shiftDetail: nowRota,
      totaltime: `${hours}:${minutes}:${seconds}`,
    });

    await userTimeRegistorData.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getlocation,
  postdata,
  getdata,
  getsingle,
  putdata,
  postdataAdmin,
  getsingleAdmin,
  putdataAdmin,
  postdataQR,
  putdataQR,
  calculateTimeDifference,
  postClockInOut,
};
