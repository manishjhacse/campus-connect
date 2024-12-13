const mongoose=require("mongoose")
const roomSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    preferences: {
      gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
      smoking: { type: Boolean, required: true },
      budget: { type: Number, required: true }
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    availability: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });
  const Room=mongoose.model("Room",roomSchema)
  module.exports={Room}
