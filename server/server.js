import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Store messages in memory (resets on server restart)
let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = []; // Initialize room if not exists
    socket.emit("prev_msgs", rooms[roomId]); // Send previous messages when joining
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", ({ roomId, userId, text }) => {
    if (!rooms[roomId]) rooms[roomId] = []; // Ensure room exists
    const msg = { userId, text };
    rooms[roomId].push(msg);
    io.to(roomId).emit("receive_message", msg); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
