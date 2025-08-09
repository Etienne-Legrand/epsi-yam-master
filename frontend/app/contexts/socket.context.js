import React from "react";
import io from "socket.io-client";

export const socketEndpoint =
  process.env.EXPO_PUBLIC_SOCKET_URL_MOBILE ||
  process.env.EXPO_PUBLIC_SOCKET_URL_WEB;

export const socket = io(socketEndpoint, {
  transports: ["websocket"],
});

const hasConnectionRef = { current: false };

socket.on("connect", () => {
  console.log("connect: ", socket.id);
  hasConnectionRef.current = true;
});

socket.on("disconnect", () => {
  hasConnectionRef.current = false;
  console.log("disconnected from server"); // undefined
  socket.removeAllListeners();
});

export const hasConnection = hasConnectionRef;

export const SocketContext = React.createContext();
