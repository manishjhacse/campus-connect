const { OTP, User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendMail = require("../utills/sendEmail");

///Singup OTP
exports.signupOTP = async (req, res) => {
  let savedOtp;
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already Registered",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const otpRecord = await OTP.findOne({ email });

    if (otpRecord) {
      if (otpRecord.expiresAt > Date.now()) {
        const remainingTimeInMillis = otpRecord.expiresAt - Date.now();
        const remainingMinutes = Math.floor(remainingTimeInMillis / 60000);
        const remainingSeconds = Math.floor(
          (remainingTimeInMillis % 60000) / 1000
        );
        return res.json({
          success: true,
          message: `OTP already sent. Request a new one after ${remainingMinutes} minutes and ${remainingSeconds} seconds.`,
        });
      }

      savedOtp = await OTP.findOneAndUpdate(
        { email },
        { code, expiresAt: Date.now() + 10 * 60 * 1000 },
        { new: true }
      );
    } else {
      savedOtp = await OTP.create({
        email,
        code,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });
    }

    // Send OTP email
    const result = await sendMail(
      email,
      "Your OTP Code",
      `Your OTP is ${code}. It is valid for 10 minutes.`
    );

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "OTP sent successfully.",
        data: result,
      });
    } else {
      if (savedOtp) {
        await OTP.deleteOne({ _id: savedOtp._id });
      }
      return res.status(501).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
        error: result,
      });
    }
  } catch (err) {
    if (savedOtp) {
      await OTP.deleteOne({ _id: savedOtp._id });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
      error: err,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName,lastName, email, password, otp, registration_no } = req.body;
    const sentOtp = await OTP.findOne({ email });
    if (sentOtp.code == otp && sentOtp.expiresAt < new Date(Date.now())) {
      return res.status(400).json({
        success: false,
        message: "OTP expired, request a new one!",
      });
    }
    if (sentOtp.code != otp) {
      return res.status(400).json({
        success: false,
        message: "wrong OTP",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went Wrong While password Hashing",
        error: err.message,
      });
    }
    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      registration_no,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User can't created, Try again",
      error: err,
    });
  }
};
