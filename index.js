const express = require("express");
const dbConnect = require("./Config/dbConnect");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./Middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

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
app.use("/api/superadmin", require("./Routes/SuperAdminRouter"));
app.use("/api/user", require("./Routes/User/userRouter"));
app.use("/api/admin", require("./Routes/Admin/AdminRouter"));
app.use("/api/department", require("./Routes/Planning/DpartmntDesigntionRoute"));
app.use("/api/designation", require("./Routes/Planning/DesignationRoute"));
app.use("/api/leave", require("./Routes/LeaveManagement/LeaveRouter"));
app.use("/api/clock", require("./Routes/Clock/ClockIn-OutRoute"));
app.use("/api/holiday", require("./Routes/Holiday/HolidayRouter"));
app.use("/api/company", require("./Routes/Planning/CompanyRouter"));
app.use("/api/rota", require("./Routes/Rota/RotaRouter"));
app.use("/api/leavecategory", require("./Routes/LeaveManagement/LeaveCategoryRouter"));
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
app.use("/api/usertimeregister", require("./Routes/User/UserTimeRegisterRoute"));
app.use("/api/payroll-allowance", require("./Routes/Payroll/PayrollAllowanceRouter"));
app.use("/api/payroll-deduction", require("./Routes/Payroll/PayrollDeductionRouter"));
app.use(
  "/api/payroll-monthly-pay-grade",
  require("./Routes/Payroll/PayrollMonthlyRouter")
);
app.use(
  "/api/payroll-hourly-pay-grade",
  require("./Routes/Payroll/PayrollHourlyRouter")
);
app.use("/api/payroll-bonus", require("./Routes/Payroll/PayrollBonusRouter"));
app.use("/api/payroll-bonussheet", require("./Routes/Payroll/PayrollBonusSheetRouter"));
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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`HRM Server is running  at PORT ${PORT}`);
});
