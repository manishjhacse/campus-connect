const express = require("express");
const router = express.Router();
const {
  signupOTP,
  signup,
  login,
  logout,
} = require("../controllers/userController");
router.post("/signup-otp", signupOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
