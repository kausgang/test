// sockets/socket.js
const socketIo = require("socket.io");

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected. id = " + socket.id);

    // Example event listener
    socket.on("chat message", (msg) => {
      console.log("Message received: " + msg);
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

const getIo = () => io;

module.exports = { initSocket, getIo };
