import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import roomsRoutes from "./routes/rooms.js";
import usersRoutes from "./routes/users.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "https://room-app.netlify.app",
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  let currentUser;
  let currentRoom;

  socket.on("join", ({ roomName, user, text }) => {
    socket.join(roomName);
    currentUser = user.name;
    currentRoom = roomName;

    socket.emit("send message", {
      roomName,
      user: "admin",
      text: `Hello ${user.name}, welcome to room ${roomName}`,
    });

    socket.broadcast.to(roomName).emit("send message", {
      roomName,
      user: "admin",
      text: `${user.name} has joined the room!`,
    });
  });

  socket.on("chat message", (message) => {
    io.to(message.roomName).emit("send message", message);
  });

  socket.on("disconnect", () => {
    socket.broadcast.to(currentRoom).emit("send message", {
      roomName: currentRoom,
      user: "admin",
      text: `${currentUser} has left the room!`,
    });
  });
});

app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extend: true }));
app.use(cors());

app.use("/api/rooms", roomsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    // "mongodb+srv://room-app:room-app@cluster0.vp6u9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "mongodb://localhost/roomApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server running at PORT: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
