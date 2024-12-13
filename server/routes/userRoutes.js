const express = require("express");
const router = express.Router();
const { signupOTP, signup,login } = require("../controllers/userController");
router.post("/signup-otp", signupOTP);
router.post("/signup", signup);
router.post("/login",login)
module.exports = router;
