const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  mobile: { type: Number },
});
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: Number, required: true },
  validTime: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
const OTP=mongoose.model("OTP",otpSchema)
module.exports = { User,OTP };
