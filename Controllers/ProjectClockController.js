const fetch = require("node-fetch");
const axios = require("axios");
const userModel = require("../Models/User/userModel");
const ProjectClockModel = require("../Models/ProjectClockModel");
const ProjectReportModel = require("../Models/ProjectReportModel");

const postProjectClock = async (req, res) => {
  try {
    const { projectId, machineId, time } = req.body;

    const finalUser = await userModel.findOne({ card_no: machineId });
    if (!finalUser) {
      throw new Error("No employee found for that QR");
    }
    if (!finalUser.hourly_pay_grade)
      throw new Error("You are not hourly employee");
    const headers = req?.headers;
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

    const newData = await ProjectClockModel.create({
      userid: finalUser._id,
      time,
      projectid: projectId,
      browserName,
      platform,
      isMobile,
    });
    await res.status(200).json(newData);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const putProjectClock = async (req, res) => {
  try {
    const { id: userid } = req.user;
    const { clockouttime, totaltime } = req.body;

    const user = await userModel.findById(userid);

    const branch_id = user.branch_id;

    // Find the user data based on userid or adminid
    const userdata = await ProjectClockModel.findOne({
      userid,
    });

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    const { time, projectid, browserName, platform, isMobile } = userdata;

    // Find or create the UserTimeRegistorData
    let projectRegistorData = await ProjectReportModel.findOne({
      userid,
      projectid,
    });

    if (!projectRegistorData) {
      projectRegistorData = new ProjectReportModel({
        userid,
        projectid,
        branch_id,
        clock: [],
      });
    }

    // projectRegistorData.userid = userid;
    // projectRegistorData.adminid = adminid;
    // // Push clock data to projectRegistorData
    projectRegistorData.clock.push({
      clockInDetails: { time, browserName, platform, isMobile },
      clockouttime,
      totaltime,
    });

    await projectRegistorData.save();

    // Remove the user data
    await ProjectClockModel.findOneAndDelete({
      userid,
    });

    return res
      .status(200)
      .json({ success: true, mainData: projectRegistorData });
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
  const { projectid } = req.params;
  try {
    const getsingledata = await ProjectClockModel.findOne({ projectid });
    if (getsingledata) {
      res.status(200).json({ clockedIn: true, clockIn: getsingledata });
    } else {
      res.status(500).json({ clockedIn: false });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { postProjectClock, getdata, getsingle, putProjectClock };
