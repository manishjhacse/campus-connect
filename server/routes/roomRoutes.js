const express = require("express");
const router = express.Router();
const { auth } = require("../auth/userAuth");
const { addRoom, getRooms, deleteRoom } = require("../controllers/roomController");
router.post("/addRoom", auth, addRoom);
router.get("/getRooms", auth,getRooms);
router.delete("/deleteRoom", auth, deleteRoom);
module.exports = router;
