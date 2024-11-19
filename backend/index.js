import http from "http";
import SocketService from "./services/socket.js";

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 3000;
  SocketService.io.attach(httpServer);
  httpServer.listen(PORT, () => {
    console.log("HTTP Server is running on port " + PORT);
  });
}

init();
