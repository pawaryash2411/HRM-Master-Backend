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
app.use("/api/user", require("./Routes/userRouter"));
app.use("/api/admin", require("./Routes/AdminRouter"));
app.use("/api/department", require("./Routes/DpartmntDesigntionRoute"));
app.use("/api/designation", require("./Routes/DesignationRoute"));
app.use("/api/leave", require("./Routes/LeaveRouter"));
app.use("/api/clock", require("./Routes/ClockIn-OutRoute"));
app.use("/api/holiday", require("./Routes/HolidayRouter"));
app.use("/api/company", require("./Routes/CompanyRouter"));
app.use("/api/rota", require("./Routes/RotaRouter"));
app.use("/api/leavecategory", require("./Routes/LeaveCategoryRouter"));
app.use("/api/machinesetup", require("./Routes/MachineSetupRoute"));
app.use("/api/trainer", require("./Routes/TrainerRouter"));
app.use("/api/traininglist", require("./Routes/TrainingRouter"));
app.use("/api/award", require("./Routes/AwardRouter"));
app.use("/api/complaint", require("./Routes/ComplaintRouter"));
app.use("/api/promotion", require("./Routes/PromotionRouter"));
app.use("/api/resignation", require("./Routes/ResignationRouter"));
app.use("/api/termination", require("./Routes/TerminationRouter"));
app.use("/api/transfer", require("./Routes/TransferRouter"));
app.use("/api/warning", require("./Routes/WarningRouter"));
app.use("/api/travel", require("./Routes/TravelRouter"));
app.use("/api/projects", require("./Routes/ProjectsRouter"));
app.use("/api/task", require("./Routes/TasksRouter"));
app.use("/api/client", require("./Routes/ClientRouter"));
app.use("/api/taxtype", require("./Routes/TaxTypeRouter"));
app.use("/api/register", require("./Routes/RegisterRouter"));
app.use("/api/usertimeregister", require("./Routes/UserTimeRegisterRoute"));
app.use("/api/payroll-allowance", require("./Routes/PayrollAllowanceRouter"));
app.use("/api/payroll-deduction", require("./Routes/PayrollDeductionRouter"));
app.use("/api/payroll-monthly-pay-grade", require("./Routes/PayrollMonthlyRouter"));
app.use("/api/payroll-hourly-pay-grade", require("./Routes/PayrollHourlyRouter"));
app.use("/api/payroll-bonus", require("./Routes/PayrollBonusRouter"));
app.use("/api/payroll-salary-sheet", require("./Routes/PayrollSalarySheetRouter"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`HRM Server is running  at PORT ${PORT}`);
});
