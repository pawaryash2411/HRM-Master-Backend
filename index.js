const express = require("express");
const dbConnect = require("./Config/dbConnect");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./Middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();

const ZKLib = require("zklib-birigu");

const path = require("path");

const PORT = process.env.PORT;

const net = require("net");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// super admin
app.use("/api/language", require("./Routes/LanguageRouter"));
app.use("/api/superadmin", require("./Routes/SuperAdminRouter"));
app.use("/api/user", require("./Routes/User/userRouter"));
app.use("/api/admin", require("./Routes/Admin/AdminRouter"));
app.use("/api/superAdmin", require("./Routes/SuperAdmin/SuperAdminRouter"));
app.use(
  "/api/department",
  require("./Routes/Planning/DpartmntDesigntionRoute")
);
app.use("/api/designation", require("./Routes/Planning/DesignationRoute"));
app.use("/api/leave", require("./Routes/LeaveManagement/LeaveRouter"));
app.use("/api/clock", require("./Routes/Clock/ClockIn-OutRoute"));
app.use("/api/project-clock", require("./Routes/ProjectClockRouter"));
app.use("/api/project-report", require("./Routes/ProjectReportRouter"));
app.use("/api/holiday", require("./Routes/Holiday/HolidayRouter"));
app.use("/api/company", require("./Routes/Planning/CompanyRouter"));
app.use("/api/rota", require("./Routes/Rota/RotaRouter"));
app.use("/api/rules", require("./Routes/Rota/AttendanceRulesRouter"));
app.use("/api/shift-category", require("./Routes/Rota/ShiftCategoryRouter"));
app.use("/api/rule-category", require("./Routes/Rota/RulesCategoryRouter"));
app.use(
  "/api/leavecategory",
  require("./Routes/LeaveManagement/LeaveCategoryRouter")
);
app.use("/api/machinesetup", require("./Routes/MachineSetupRoute"));
app.use("/api/trainer", require("./Routes/Training/TrainerRouter"));
app.use("/api/traininglist", require("./Routes/Training/TrainingRouter"));
app.use("/api/award", require("./Routes/CoreHR/AwardRouter"));
app.use("/api/complaint", require("./Routes/CoreHR/ComplaintRouter"));
app.use("/api/promotion", require("./Routes/CoreHR/PromotionRouter"));
app.use("/api/resignation", require("./Routes/CoreHR/ResignationRouter"));
app.use("/api/termination", require("./Routes/CoreHR/TerminationRouter"));
app.use("/api/transfer", require("./Routes/CoreHR/TransferRouter"));
app.use("/api/warning", require("./Routes/CoreHR/WarningRouter"));
app.use("/api/travel", require("./Routes/CoreHR/TravelRouter"));
app.use("/api/projects", require("./Routes/ProjectsRouter"));
app.use("/api/task", require("./Routes/TasksRouter"));
app.use("/api/client", require("./Routes/ClientRouter"));
app.use("/api/taxtype", require("./Routes/TaxTypeRouter"));
app.use("/api/register", require("./Routes/RegisterRouter"));
app.use("/api/attendance-setting", require("./Routes/Planning/AttendanceSettingRouter"));
app.use(
  "/api/usertimeregister",
  require("./Routes/User/UserTimeRegisterRoute")
);
app.use(
  "/api/payroll-allowance",
  require("./Routes/Payroll/PayrollAllowanceRouter")
);
app.use(
  "/api/payroll-deduction",
  require("./Routes/Payroll/PayrollDeductionRouter")
);
app.use(
  "/api/payroll-monthly-pay-grade",
  require("./Routes/Payroll/PayrollMonthlyRouter")
);
app.use(
  "/api/payroll-hourly-pay-grade",
  require("./Routes/Payroll/PayrollHourlyRouter")
);
app.use("/api/payroll-bonus", require("./Routes/Payroll/PayrollBonusRouter"));
app.use(
  "/api/payroll-bonussheet",
  require("./Routes/Payroll/PayrollBonusSheetRouter")
);
app.use(
  "/api/payroll-salary-sheet",
  require("./Routes/Payroll/PayrollSalarySheetRouter")
);
app.use(
  "/api/performance_appraisal",
  require("./Routes/Performance/PerformanceAppraisalRouter")
);
app.use(
  "/api/performance_goal_tracking",
  require("./Routes/Performance/PerformanceGoaltrackingRouter")
);
app.use(
  "/api/performance_goal_type",
  require("./Routes/Performance/PerformanceGoaltypeRouter")
);
app.use(
  "/api/performance_indicator",
  require("./Routes/Performance/PerformanceIndicatorRouter")
);

// const test = async () => {
//   let zkInstance = new ZKLib("192.168.1.201", 4370, 5200, 5000);
//   try {
//     // Create socket to machine
//     await zkInstance.createSocket();

//     // Get general info like logCapacity, user counts, logs count
//     // It's really useful to check the status of device

//     console.log("execute", await zkInstance.getInfo());
//   } catch (e) {
//     console.log(e);
//     if (e.code === "EADDRINUSE") {
//     }
//   }

//   // Get users in machine

//   const users = await zkInstance.getUsers();
//   console.log(users);

//   // Create new user: setUser(uid, userid, name, password, role = 0, cardno = 0)

//   await zkInstance.setUser(12, "9", "testing", "111", 0, 0);

//   // You can also read realtime log by getRealTimelogs function

//   await zkInstance.getRealTimeLogs((data) => {
//     // do something when some checkin
//     console.log(data);
//   });
// };

app.use("/i18n", express.static(path.join(__dirname, "i18n")));

// const biometricDeviceIP = "86.124.84.198";
// const biometricDevicePort = 4370;

// const client = net.createConnection(
//   { host: biometricDeviceIP, port: biometricDevicePort },
//   async () => {
//     console.log("Connected to biometric device");
//     const command = "CMD_GET_TIME";
//     const data = client.read(64);
//     console.log(data);
//   }
// );

// client.on("data", (data) => {
//   console.log("Biometric data received:", data.toString());
//   // Process the data received from the biometric device
// });

// // Handle connection errors
// client.on("error", (err) => {
//   console.error("Error connecting to biometric device:", err.message);
// });

// // Handle disconnection
// client.on("end", () => {
//   console.log("Connection to biometric device closed");
// });

// // test(); // in the end we execute the function

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.status(200).json({ content: req.body });
// });

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`HRM Server is running  at PORT ${PORT}`);
});
