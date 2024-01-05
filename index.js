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
app.use("/api/training", require('./Routes/TrainingRouter/TrainingRouter'));
app.use("/api/award", require('./Routes/CoreHRRouter/AwardRouter'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `HRM Server is running  at PORT ${PORT}`
  );
});
