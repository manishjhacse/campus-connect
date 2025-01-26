const express = require("express");
const router = express.Router();
const {
  signupOTP,
  signup,
  login,
  logout,
  resetOTP,
  changePassword
} = require("../controllers/userController");
router.post("/signup-otp", signupOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/changepassword-otp", resetOTP);
router.post("/changePassword", changePassword);

module.exports = router;
