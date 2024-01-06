const db = require("../Models/Clockin-OutModel/Clockin-OutModel");

const fetch = require("node-fetch");
const axios = require("axios");
const UserTimeRegistor = require("../Models/UserTimeRegistor/UserTimeRegistor");
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
    const { id: userid } = req.user;
    const { time } = req.body;
    console.log(time, userid);
    const newData = await db.create({ userid, time });
    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putdata = async (req, res) => {
  try {
    const { id: userid } = req.user;
    const { clockouttime, totaltime } = req.body;
    const userdata = await db.findOne({ userid });

    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    const clockintime = userdata.time;

    let userTimeRegistorData = await UserTimeRegistor.findOne({ userid });

    if (!userTimeRegistorData) {
      userTimeRegistorData = new UserTimeRegistor({ userid, clock: [] });
    }

    userTimeRegistorData.clock.push({ clockintime, clockouttime, totaltime });

    await userTimeRegistorData.save();

    let removedata = await db.findOne({ userid });

    if (removedata) {
      await removedata.remove();
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({
        success: false,
        message: "No document found for the given userid.",
      });
    }
  } catch (error) {
    console.log(error);
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
      res.status(200).json({ clockedIn: false });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getlocation, postdata, getdata, getsingle, putdata };
