const express = require("express");
const router = express.Router();
const {
  signupOTP,
  signup,
  login,
  logout,
  resetOTP,
  changePassword,
  editProfile,
  getUserDetails,
  getLoggedInUser
} = require("../controllers/userController");
const { auth } = require("../auth/userAuth");
router.post("/signup-otp", signupOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/editProfile", auth, editProfile);
router.post("/logout", logout);
router.post("/changepassword-otp", resetOTP);
router.post("/changePassword", changePassword);
router.get("/getUserDetails",getUserDetails)
router.get("/getLoggedInUser",auth,getLoggedInUser)

module.exports = router;
