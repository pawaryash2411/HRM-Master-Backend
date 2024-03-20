const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    access: [],
    password: {
      type: String,
      required: false,
    },
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
    permanent_address: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    shift: {
      type: Boolean,
      require: true
    },
    picture: {
      type: String,
    },
    joindate: {
      type: String,
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    monthly_pay_grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payrollmonthly",
    },
    hourly_pay_grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payrollhourly",
    },
    expiry_date: {
      type: String,
    },
    allowed_devices: {
      type: Number,
    },
    logged_ips: [{ type: String }],
    leave: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leave",
      },
    ],
    notifications: [{ type: String }],
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

module.exports = mongoose.model("admin", userSchema);
