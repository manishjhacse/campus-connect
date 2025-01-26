const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDBURL);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log("Something went wrong while connecting DB");
    console.log(err.message);
    process.exit(1);
  }
};
