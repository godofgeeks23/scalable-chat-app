import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 3000;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected -", socket.id);
  io.emit(
    "message",
    `Server: Everyone please welcome ${socket.id} to the chat!`
  );

  io.on("disconnect", (socket) => {
    console.log("Client disconnected -", socket.id);
  });

  socket.on("message", (message) => {
    console.log("Received message -", message);
    io.emit("message", socket.id + " says: " + message);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
