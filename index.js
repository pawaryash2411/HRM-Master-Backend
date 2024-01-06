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
app.use("/api/superadmin", require('./Routes/SuperAdminRouter/SuperAdminRouter'));
app.use("/api/user", require('./Routes/userRouter/userRouter'));
app.use("/api/admin", require('./Routes/AdminRouter/AdminRouter'));
app.use("/api/department", require('./Routes/PlanningRoute/DpartmntDesigntionRoute'));
app.use("/api/leave", require('./Routes/LeaveRouter/LeaveRouter'));
app.use("/api/clock", require('./Routes/ClockIn-OutRoute/ClockIn-OutRoute'));
app.use("/api/holiday", require('./Routes/HolidayRouter/HolidayRouter'));
app.use("/api/company", require('./Routes/CompanyRouter/CompanyRouter'));
app.use("/api/rota", require('./Routes/RotaRouter/RotaRouter'));
app.use("/api/leavecategory", require('./Routes/LeaveCategoryRoute/LeaveCategoryRouter'));
app.use("/api/machinesetup", require('./Routes/MachineSetupRoute/MachineSetupRoute'));
app.use("/api/trainer", require('./Routes/TrainerRouter/TrainerRouter'));
app.use("/api/traininglist", require('./Routes/TrainingRouter/TrainingRouter'));
app.use("/api/award", require('./Routes/CoreHRRouter/AwardRouter'));
app.use("/api/complaint", require('./Routes/CoreHRRouter/ComplaintRouter'));
app.use("/api/promotion", require('./Routes/CoreHRRouter/PromotionRouter'));
app.use("/api/resignation", require('./Routes/CoreHRRouter/ResignationRouter'));
app.use("/api/termination", require('./Routes/CoreHRRouter/TerminationRouter'));
app.use("/api/transfer", require('./Routes/CoreHRRouter/TransferRouter'));
app.use("/api/Warning", require('./Routes/CoreHRRouter/WarningRouter'));
app.use("/api/travel", require('./Routes/CoreHRRouter/TravelRouter'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `HRM Server is running  at PORT ${PORT}`
  );
});
