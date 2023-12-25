const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./Config/dbConnect");
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

app.use("/api/department", require('./Routes/PlanningRoute/DepartmentRoute'));
app.use("/api/designation", require('./Routes/PlanningRoute/DesignationRoute'));
app.use("/api/addstaff", require('./Routes/AddstaffRoute/AddstaffRoute'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Your Server is running  at PORT ${PORT}`
  );
});
