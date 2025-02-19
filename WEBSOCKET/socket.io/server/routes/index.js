// routes/index.js
const express = require("express");
const router = express.Router();

// Access socket.io
const { getIo } = require("../sockets/socket");

// Serve a simple HTML page (can be changed according to your app's needs)
router.get("/", (req, res) => {
  res.send(
    '<h1>Socket.io Example</h1><button id="sendMessage">Send Message</button><script src="/socket.io/socket.io.js"></script><script>const socket = io(); document.getElementById("sendMessage").addEventListener("click", () => { socket.emit("chat message", "Hello from client!"); });</script>'
  );
});

// Example of emitting a message to all clients from the router
router.post("/send-message", (req, res) => {
  const message = req.body.message;
  getIo().emit("chat message", message); // Emit the message to all connected clients
  res.send("Message sent!");
});

module.exports = router;
