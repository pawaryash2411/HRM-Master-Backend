const db = require("../Models/Clockin-OutModel");

const fetch = require("node-fetch");
const axios = require("axios");
const UserTimeRegistor = require("../Models/UserTimeRegistor");
const userModel = require("../Models/userModel");
const AdminModel = require("../Models/AdminModel");
const apiKey = "AIzaSyBpcBi67uEbAIQTdShuxektx1E_v38CTHI";
const address = "tajmahal";
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  address
)}&key=${apiKey}`;

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
    await res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const putdata = async (req, res) => {
  try {
    let userid;
    let adminid;
    const { id: userId } = req.user;
    const { clockouttime, totaltime } = req.body;

    let finalUser;
    const user = await userModel.findById(userId);
    if (!user) {
      finalUser = await AdminModel.findById(userId);
    } else {
      finalUser = user;
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
        clock: [],
        verified: !!adminid,
      });
    }

    userTimeRegistorData.userid = userid;
    userTimeRegistorData.adminid = adminid;
    // Push clock data to UserTimeRegistorData
    userTimeRegistorData.clock.push({
      clockInDetails: { time, browserName, platform, isMobile },
      clockouttime,
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
      res.status(200).json({ clockedIn: true, clockIn: getsingledata.time });
    } else {
      const getSingle = await db.findOne({ adminid: req.user.id });
      res.status(200).json({ clockedIn: true, clockIn: getSingle.time });
      if (!getSingle) {
        res.status(200).json({ clockedIn: false });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getlocation, postdata, getdata, getsingle, putdata };
