const { Room } = require("../model/roomModel");
const {
  uploadImageToCloudinary,
  deleteFileFromCloudinary,
} = require("../utills/cloudinary");

exports.addRoom = async (req, res) => {
  try {
    const { gender, smoking, price, location } = req.body;
    if (!gender || !smoking || !price || !location) {
      return res.status(400).json({
        success: false,
        message: "Room details missing",
      });
    }
    const userId = req.user._id;
    const roomDetails = {
      gender,
      smoking,
      location,
      price,
      userId,
    };
    if (req.files && req.files.image) {
      const image = req.files.image;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid file type",
        });
      }
      const uploadResponse = await uploadImageToCloudinary(image, 70);
      roomDetails.image = uploadResponse;
    }
    const room = await Room.create(roomDetails);
    const createdRoom = await room.populate(
      "userId",
      "firstName lastName mobile"
    );
    return res.status(200).json({
      success: true,
      message: "Room added",
      room:createdRoom
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("userId", "firstName lastName mobile")
      .sort({ createdAt: -1 });
    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Rooms Available",
      });
    }
    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteRoom = async (req, res) => {
    try {
      const room = req.query;
      const autherId = req.user._id;
      if (String(room.userId._id) != String(autherId)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }
      if (room.image) {
        await deleteFileFromCloudinary(room.image);
      }
      const deletedRoom = await Room.findByIdAndDelete(room._id);
      return res.status(200).json({
        success: true,
        message: "Room Deleted",
        post: deletedRoom,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
        message: "Internal Server Error",
      });
    }
  };
