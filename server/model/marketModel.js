const mongoose = require("mongoose");
const marketplaceSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  availability: { type: Boolean, default: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Market = mongoose.model("Market", marketplaceSchema);
module.exports = { Market };
