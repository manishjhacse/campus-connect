const express = require("express");
const router = express.Router();
const { signupOTP, signup } = require("../controllers/userController");
router.post("/signup-otp", signupOTP);
router.post("/signup", signup);
module.exports = router;
