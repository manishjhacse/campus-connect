const users = {};

function handleSocketEvents(io, socket) {
    // User joins group
    socket.on("join_group", (username) => {
        users[socket.id] = username;
        io.emit("update_users", Object.values(users));
        console.log(`${username} joined.`);
    });

    // Collaborative coding updates
    socket.on("code_update", (code) => {
        socket.broadcast.emit("code_update", code);
    });

    // Whiteboard updates
    socket.on("whiteboard_update", (data) => {
        socket.broadcast.emit("whiteboard_update", data);
    });

    // WebRTC signaling for voice calls
    socket.on("voice_offer", (data) => {
        io.to(data.target).emit("voice_offer", { offer: data.offer, from: socket.id });
    });

    socket.on("voice_answer", (data) => {
        io.to(data.target).emit("voice_answer", { answer: data.answer, from: socket.id });
    });

    socket.on("ice_candidate", (data) => {
        io.to(data.target).emit("ice_candidate", { candidate: data.candidate, from: socket.id });
    });

    // User disconnects
    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("update_users", Object.values(users));
    });
}

module.exports = { handleSocketEvents };
