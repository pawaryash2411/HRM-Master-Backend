const db = require("../../Models/userModel/userModel");
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { firstname, lastname, email, password, gender, contact } = req.body;

    try {
        // Check if all required fields are present and not empty
        if (!firstname || !lastname || !email || !password || !gender || !contact) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        // Additional validations for email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password" });
        }

        const exists = await db.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new db({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            gender,
            contact,
        });

        const userRegister = await newUser.save();
        res.status(200).json({ userRegister });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1yr",
    });
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
      const user = await db.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      // console.log(password, user);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = createToken(user._id);
      console.log("datatoken", token);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  



module.exports = { registerUser , loginUser};
