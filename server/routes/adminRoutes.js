const express = require("express");
const {
  adminLogin,
  getPendingUsers,
  approveUser,
  rejectUser,
  getAllUsers,
  suspendUser,
  removeSuspendUser,
} = require("../controllers/adminController");
const { adminAuth } = require("../auth/adminAuth");
const router = express.Router();
router.post("/adminLogin", adminLogin);
router.get("/getPendingUsers", adminAuth, getPendingUsers);
router.get("/getAllUsers", adminAuth, getAllUsers);
router.post("/approveUser", adminAuth, approveUser);
router.post("/rejectUser", adminAuth, rejectUser);
router.post("/suspendUser", adminAuth, suspendUser);
router.post("/removeSuspensionUser", adminAuth, removeSuspendUser);
module.exports = router;
