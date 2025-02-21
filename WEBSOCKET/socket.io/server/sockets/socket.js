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

    let intervalId;

    const sendRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
      socket.emit("randomNumber", randomNumber);
    };

    intervalId = setInterval(sendRandomNumber, 1500);

    socket.on("disconnect", () => {
      console.log("User disconnected");
      clearInterval(intervalId); // Stop sending random numbers
    });
  });
};

const getIo = () => io;

module.exports = { initSocket, getIo };
