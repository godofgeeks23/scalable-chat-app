import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server with id", socket.id);
});

socket.on("message", (message) => {
  console.log("Got message from the server -", message);
});
