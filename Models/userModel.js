const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    mobile_no: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    present_address: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    permanent_address: {
      type: String,
      required: true,
    },
    display_frontmonitor: {
      type: Boolean,
      required: true,
    },
    attendense_calculation: {
      type: Boolean,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    weekday_shift: {
      type: String,
      required: true,
    },
    both_shift: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    joindate: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    leave: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leave",
      },
    ],
    monthly_pay_grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payrollmonthly",
    },
    hourly_pay_grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payrollhourly",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

module.exports = mongoose.model("user", userSchema);
