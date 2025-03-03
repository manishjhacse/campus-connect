const express = require("express");
const {
  adminLogin,
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("../controllers/adminController");
const { adminAuth } = require("../auth/adminAuth");
const router = express.Router();
router.post("/adminLogin", adminLogin);
router.get("/getPendingUsers",adminAuth, getPendingUsers);
router.post("/approveUser", adminAuth, approveUser);
router.post("/rejectUser", adminAuth, rejectUser);
module.exports = router;
