const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const postRouter=require("./routes/postRoutes")
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
require("./config/connectDB").connectDB();
app.use("/api", userRouter);
app.use("/api",postRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
