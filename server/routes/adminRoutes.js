const express = require("express");
const {
  adminLogin,
  getPendingUsers,
} = require("../controllers/adminController");
const router = express.Router();
router.post("/adminLogin", adminLogin);
router.get("/getPendingUsers", getPendingUsers);
module.exports = router;
