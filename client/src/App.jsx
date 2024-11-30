import { useEffect, useState, useRef } from "react";

import "./App.css";
import { io } from "socket.io-client";
import Message from "./components/Message";

function App() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const thissocket = io("http://localhost:3000");

    thissocket.on("connect", () => {
      console.log("Connected to server with id", thissocket.id);
      setConnected("True");
      setSocket(thissocket);
    });

    thissocket.on("message", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    inputRef.current?.focus();

    return () => {
      thissocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputValue) {
      socket.emit("message", inputValue);
      setInputValue("");
      inputRef.current?.focus();
      console.log("Sent message to Server - ", inputValue);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="page-container flex flex-col items-center bg-gray-900 min-h-screen py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">Chat App</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl items-center">
          <p className="text-gray-400 text-sm mb-4">
            Status: Connection with WS Server - {connected ? "Yes" : "No"}
          </p>
          <div className="flex items-center mb-4">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none flex-grow text-sm leading-6 text-gray-900 placeholder-gray-500 rounded-md py-2 pl-3 pr-3 ring-1 ring-gray-400 shadow-sm"
            />
            <button
              onClick={sendMessage}
              className="ml-4 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 shadow-md transition duration-300"
            >
              Send ➤
            </button>
            <button
              onClick={clearMessages}
              className="ml-4 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 shadow-md transition duration-300"
            >
              Clear All Messages 🧹
            </button>
          </div>
          <ul className="bg-gray-700 p-4 rounded-lg overflow-y-auto h-96 space-y-2">
            {messages.map((msg, index) => (
              <Message msg={msg} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
