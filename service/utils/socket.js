const { Server } = require("socket.io");

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL, 
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join chat room
    socket.on("joinRoom", ({ chatRoomId }) => {
      const roomName = `room_${chatRoomId}`;
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined ${roomName}`);
    });

    // Optional: typing indicator
    socket.on("typing", ({ chatRoomId, userId }) => {
      socket.to(`room_${chatRoomId}`).emit("typing", { userId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { setupSocket, getIO };
