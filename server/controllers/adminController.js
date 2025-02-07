const { Admin } = require("../model/adminModel");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all the details",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Email not registered!",
      });
    }
    const payload = {
      email: admin.email,
      _id: admin._id,
      name: admin.name,
    };
    if (await bcrypt.compare(password, admin.password)) {
      let token = await jwt.sign(payload, process.env.SECRETCODE, {});
      admin.password = undefined;
      const options = {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        admin: admin,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failure, Try Again",
      Error: err,
    });
  }
};

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
