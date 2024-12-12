const { OTP,User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendMail = require("../utills/sendEmail");


exports.signupOTP=async(req,res)=>{
    
}
exports.signup = async (req, res) => {
  try {
    const {name,email,password,mobile,otp,registration_no}=req.body
  } catch (err) {}
};
