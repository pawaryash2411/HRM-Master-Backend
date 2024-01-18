const LeaveModel = require("../Models/LeaveModel");
const PayrollBonusSheetModel = require("../Models/PayrollBonusSheetModel");
const PayrollHourlyModel = require("../Models/PayrollHourlyModel");
const PayrollMonthlyModel = require("../Models/PayrollMonthlyModel");
const db = require("../Models/PayrollMonthlyModel");
const UserTimeRegistor = require("../Models/UserTimeRegistor");
const userModel = require("../Models/userModel");

function getDaysDifference(startDate, endDate) {
  // Convert the dates to UTC to avoid issues with daylight saving time
  const startUTC = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endUTC = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  console.log(startUTC, endUTC);
  // Calculate the difference in milliseconds
  const timeDifference = endUTC - startUTC;

  // Convert the difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
function getLastDayOrCurrentDate(year, month) {
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, 1); // month is zero-indexed
  if (
    currentDate.getFullYear() == year &&
    currentDate.getMonth() == month - 1
  ) {
    return currentDate;
  }

  if (inputDate <= currentDate) {
    // If the input month has already passed, return the last day of the previous month
    const lastDayOfPreviousMonth = new Date(year, month, 0);
    return lastDayOfPreviousMonth;
  } else {
    // If the input month is the current or future month, return the current date
    return currentDate;
  }
}
function getPreviousMonth(year, month) {
  // Adjust the month and year for January
  if (month === 0) {
    month = 11;
    year -= 1;
  } else {
    month -= 1;
  }

  return { year, month };
}

const getSalarySheetForMonth = async (req, res) => {
  try {
    const { date } = req.params;
    const [year, month] = date.split("-");
    const lastOrCurDay = getLastDayOrCurrentDate(year, month);
    const users = await userModel.find({ adminId: req.user?.id }).populate({
      path: "monthly_pay_grade",
      // path: "userid",
      // populate: {
      populate: {
        path: "allowance deduction",
      },
    });
    const finalUsers = [];
    async function processUsers() {
      for (const user of users) {
        let paid = false;
        if (user?.paid?.includes(`${year}-${month}`)) {
          paid = true;
        }
        const diff = getDaysDifference(new Date(user.joindate), lastOrCurDay);
        console.log(diff);
        const isValid =
          new Date(user.joindate).getDate() <= lastOrCurDay.getDate();

        if (diff >= 30 && isValid) {
          const { month: prevMonth, year: prevYear } = getPreviousMonth(
            lastOrCurDay.getFullYear(),
            lastOrCurDay.getMonth()
          );
          const endDate = new Date(
            lastOrCurDay.getFullYear(),
            lastOrCurDay.getMonth(),
            new Date(user.joindate).getDate()
          );
          const startDate = new Date(
            prevYear,
            prevMonth,
            new Date(user.joindate).getDate()
          );
          const timeRegistor = await UserTimeRegistor.findOne({
            userid: user._id,
          });
          let overtime = 0;
          if (timeRegistor) {
            timeRegistor?.clock?.forEach((clock) => {
              if (
                new Date(clock.clockouttime) >= startDate &&
                new Date(clock.clockouttime) <= endDate
              ) {
                const totalHour = +clock.totaltime.split(":")[0];
                if (totalHour > 8) {
                  overtime = overtime + (totalHour - 8);
                }
              }
            });
          }

          const bonus = await PayrollBonusSheetModel.find({
            userid: user._id,
          }).populate("bonusid");

          let discreteLeave = [];

          const leave = await LeaveModel.find({
            user_id: user._id,
            status: "approve",
          })
            .populate("leave_type")
            .select("total_days leave_type start_date");
          // console.log(leave);
          leave?.forEach((el) => {
            const { _id, paid } = el.leave_type;
            if (
              new Date(el.start_date) >= startDate &&
              new Date(el.start_date) <= endDate
            ) {
              const isPresent = discreteLeave.some((el) => el._id === _id);
              if (isPresent) {
                discreteLeave = discreteLeave.map((leave) => {
                  if (leave._id === _id) {
                    return { ...leave, total: leave.total + el.total_days };
                  }
                  return leave;
                });
                return;
              }
              discreteLeave.push({
                _id,
                paid,
                originalTotal: el.total_days,
                total: el.total_days,
              });
            }
          });
          const finalDiscrete = discreteLeave.map((el) => {
            if (el.paid) {
              const cutDays =
                el.total > el.originalTotal ? el.total - el.originalTotal : 0;
              return { ...el, total: cutDays };
            }
            return el;
          });
          const totalUnpaidLeaves = finalDiscrete.reduce(
            (acc, cur) => (acc += cur.total),
            0
          );
          const leaveDeduction = Math.floor(
            (user.monthly_pay_grade.basic_salary / 30) * totalUnpaidLeaves
          );

          finalUsers.push({
            user,
            finalDiscrete,
            totalUnpaidLeaves,
            leaveDeduction,
            bonus,
            overtime,
            paid,
          });
        }
      }
    }
    await processUsers();
    res.status(200).json({ message: "Succesful", finalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ksmdnckds
const updatePayUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const user = await userModel.findById(id);
    user.paid.push(date);
    await user.save();
    res.status(201).json({ message: "Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIndividualSalary = async (req, res) => {
  try {
    const { date } = req.params;
    const [year, month] = date.split("-");
    const lastOrCurDay = getLastDayOrCurrentDate(year, month);
    const user = await userModel
      .findById(req.user.id)
      .populate("monthly_pay_grade");
    console.log(user.paid, `${year}-${month}`);
    const paid = user.paid.includes(`${year}-${month}`);
    if (!paid) {
      return res
        .status(201)
        .json({ message: "Success", paid: false, details: {} });
    }
    const bonus = await PayrollBonusSheetModel.find({
      userid: user._id,
    }).populate("bonusid");
    const timeRegistor = await UserTimeRegistor.findOne({
      userid: user._id,
    });
    let overtime = 0;
    if (timeRegistor) {
      const { month: prevMonth, year: prevYear } = getPreviousMonth(
        lastOrCurDay.getFullYear(),
        lastOrCurDay.getMonth()
      );
      const endDate = new Date(
        lastOrCurDay.getFullYear(),
        lastOrCurDay.getMonth(),
        new Date(user.joindate).getDate()
      );
      const startDate = new Date(
        prevYear,
        prevMonth,
        new Date(user.joindate).getDate()
      );
      overtime = timeRegistor?.clock?.reduce((acc, clock) => {
        if (
          new Date(clock.clockouttime) >= startDate &&
          new Date(clock.clockouttime) <= endDate
        ) {
          const totalHour = +clock.totaltime.split(":")[0];
          if (totalHour > 8) {
            acc = acc + (totalHour - 8);
          }
          return acc;
        }
      }, 0);
    }
    const details = { user, bonus, paid: true, overtime };
    res.status(201).json({ message: "Successful", details });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSalarySheetForMonth,
  updatePayUser,
  getIndividualSalary,
};
