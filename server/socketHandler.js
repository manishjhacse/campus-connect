// const rooms = {};
// const codeData = {};
// const whiteboardData = {};

// const socketHandler = (io) => {
//   io.on("connection", (socket) => {
//     console.log("New client connected", socket.id);

//     socket.on("joinRoom", ({ name, room, id }) => {
//       socket.join(room);

//       if (!rooms[room]) rooms[room] = [];
//       rooms[room].push({ socketId: socket.id, userId: id, name }); // Store both socketId and userId

//       io.to(room).emit("roomUsers", rooms[room]);

//       if (codeData[room]) socket.emit("codeSync", codeData[room]);
//       if (whiteboardData[room])
//         socket.emit("whiteboardSync", whiteboardData[room]);

//       socket.emit("userJoined", { name });
//     });

//     socket.on("sendMessage", ({ room, message, user,id }) => {
//       io.to(room).emit("message", { user, text: message,id });
//     });

//     socket.on("codeChange", ({ room, code }) => {
//       codeData[room] = code;
//       socket.to(room).emit("codeSync", code);
//     });

//     socket.on("whiteboardUpdate", ({ room, data }) => {
//       whiteboardData[room] = data;
//       socket.to(room).emit("whiteboardSync", data);
//     });

//     socket.on("disconnect", () => {
//       for (const room in rooms) {
//         const prevLength = rooms[room].length;
//         rooms[room] = rooms[room].filter((user) => user.socketId !== socket.id);

//         if (rooms[room].length !== prevLength) {
//           io.to(room).emit("roomUsers", rooms[room]);
//         }

//         if (rooms[room].length === 0) {
//           delete rooms[room];
//           delete codeData[room];
//           delete whiteboardData[room];
//         }
//       }
//     });
//   });
// };
// module.exports = socketHandler;



const { Chat } = require("./model/chatModel");

const rooms = {};
const codeData = {};
const whiteboardData = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    // ======================= Chat Messaging ======================= //
    socket.on("startChat", ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("send_message", async ({ chatId, senderId, senderName, message, time }) => {
      try {
        const chat = await Chat.findById(chatId);
        if (chat) {
          const newMessage = { senderId, senderName, message, time };
          chat.messages.push(newMessage);
          await chat.save();
          
          // Emit the message to all clients in the room
          socket.to(chatId).emit("receive_message", newMessage);
        }
      } catch (err) {
        console.error("Error handling chat message:", err);
      }
    });

    // ======================= Collaborative Features ======================= //
    socket.on("joinRoom", ({ name, room, id }) => {
      socket.join(room);

      if (!rooms[room]) rooms[room] = [];
      rooms[room].push({ socketId: socket.id, userId: id, name });

      io.to(room).emit("roomUsers", rooms[room]);

      if (codeData[room]) socket.emit("codeSync", codeData[room]);
      if (whiteboardData[room]) socket.emit("whiteboardSync", whiteboardData[room]);

      socket.emit("userJoined", { name });
    });

    socket.on("sendMessage", ({ room, message, user, id }) => {
      io.to(room).emit("message", { user, text: message, id });
    });

    socket.on("codeChange", ({ room, code }) => {
      codeData[room] = code;
      socket.to(room).emit("codeSync", code);
    });

    socket.on("whiteboardUpdate", ({ room, data }) => {
      whiteboardData[room] = data;
      socket.to(room).emit("whiteboardSync", data);
    });

    // ======================= Cleanup on Disconnect ======================= //
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);

      // Remove user from rooms
      for (const room in rooms) {
        const prevLength = rooms[room].length;
        rooms[room] = rooms[room].filter((user) => user.socketId !== socket.id);

        if (rooms[room].length !== prevLength) {
          io.to(room).emit("roomUsers", rooms[room]);
        }

        if (rooms[room].length === 0) {
          delete rooms[room];
          delete codeData[room];
          delete whiteboardData[room];
        }
      }
    });
  });
};

module.exports = socketHandler;
