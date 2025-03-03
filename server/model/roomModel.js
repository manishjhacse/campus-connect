const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  smoking: { type: String, enum: ["Allowed", "Not Allowed"] ,required: true },
  price: { type: String, required: true },
  location: {
    type:String
    // latitude: { type: Number, required: true },
    // longitude: { type: Number, required: true },
  },
  availability: { type: Boolean, default: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Room = mongoose.model("Room", roomSchema);
module.exports = { Room };
