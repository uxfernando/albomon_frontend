import { LOBBY_ID } from "@/constants/battle";
import { Socket } from "socket.io-client";

export const registerBaseListeners = (socket: Socket) => {
  socket.on("connect", () => {
    socket.emit("join-room", LOBBY_ID);
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });
};
