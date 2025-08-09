import React from "react";
import { Platform } from "react-native";
import io from "socket.io-client";

export const socketEndpoint =
  Platform.OS === "web"
    ? process.env.EXPO_PUBLIC_SOCKET_URL_WEB
    : process.env.EXPO_PUBLIC_SOCKET_URL_MOBILE;

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
