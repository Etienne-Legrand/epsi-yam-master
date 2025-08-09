import React from "react";
import { Platform } from "react-native";
import io from "socket.io-client";

export const socketEndpoint =
  Platform.OS === "web" ? "http://localhost:3000" : "http://10.60.104.242:3000";

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
