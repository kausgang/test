"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const page = () => {
  const connect = () => {
    const socket = io("http://localhost:4000");
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      //   console.log("connected"); // x8WIv7-mJelg7on_ALbx
    });
  };

  const disconnect = () => {
    // socket.on("disconnect", () => {
    //   console.log(socket.id); // undefined
    // });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={connect}>
        Connect
      </button>
      <button className="btn btn-primary" onClick={disconnect}>
        Disconnect
      </button>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default page;
