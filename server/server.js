const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const marketRouter = require("./routes/marketRoutes");
const adminRouter = require("./routes/adminRoutes");
const roomRouter = require("./routes/roomRoutes");
const chatRouter = require("./routes/chatRoutes");
const jobRouter = require("./routes/jobRoutes");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
const socketHandler = require("./socketHandler");

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin:  process.env.CLIENT_URL,
    methods: ["POST", "GET","DELETE"],
    credentials: true,
  },
});

// Handle WebSocket connections
socketHandler(io);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET","DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 },
    safeFileNames: true,
    abortOnLimit: true,
  })
);
require("./config/connectDB").connectDB();

// Routes
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", marketRouter);
app.use("/api", adminRouter);
app.use("/api", chatRouter);
app.use("/api", roomRouter);
app.use("/api", jobRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
