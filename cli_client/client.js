import { io } from "socket.io-client";

const PORT = 3000;
const socket = io("http://localhost:" + PORT);

socket.on("connect", () => {
  console.log("Connected to server with id", socket.id);
});

socket.on("message", (message) => {
  console.log("Got message from the server -", message);
});
 