"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Clean up socket connection on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const connectToServer = () => {
    const newSocket = io("http://localhost:4000"); // Your Express.js server URL

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
      setSocket(newSocket);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
      setSocket(null);
      setRandomNumber(null); // Clear the random number
    });

    newSocket.on("randomNumber", (number) => {
      setRandomNumber(number);
    });

    newSocket.on("chat message", (msg) => {
      // setRandomNumber(number);
      alert(msg);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setIsConnected(false);
    });

    setSocket(newSocket);
  };

  const disconnectFromServer = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div>
      <h1>Client</h1>
      {!isConnected ? (
        <button onClick={connectToServer}>Connect</button>
      ) : (
        <button onClick={disconnectFromServer}>Disconnect</button>
      )}

      {randomNumber !== null && (
        <p>Random Number from Server: {randomNumber}</p>
      )}
    </div>
  );
};

export default HomePage;
