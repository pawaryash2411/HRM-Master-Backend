const ProjectReportModel = require("../Models/ProjectReportModel");

function addTime(timeArray) {
  let totalSeconds = 0;

  timeArray.forEach((timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const totalMinutes = Math.floor(remainingSeconds / 60);
  const totalSecondsLeft = remainingSeconds % 60;

  return {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSecondsLeft,
  };
}

const userReport = async (req, res) => {
  try {
    const { projectId } = req.params;
    const report = await ProjectReportModel.findOne({
      projectid: projectId,
      userid: req.user.id,
    });

    const refinedClocks = report.clock.map((temp) => temp.totaltime);
    const total = addTime(refinedClocks);

    res.status(200).json({ report, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const adminReport = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projects = await ProjectReportModel.find({
      projectid: projectId,
    }).populate({ path: "userid", populate: { path: "hourly_pay_grade" } });
    let totalCost = 0;
    console.log(projects);
    const clocks = projects.map((el) => {
      const refinedClocks = el.clock.map((temp) => temp.totaltime);
      const total = addTime(refinedClocks);
      totalCost += total.hours * el.userid.hourly_pay_grade.hourly_rate;
      return { user: el.userid.name, total };
    });
    res.json({ clocks, totalCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userReport, adminReport };
