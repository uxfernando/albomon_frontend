import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (serverIp: string) => {
  if (!serverIp) {
    console.error("No server IP provided for socket connection");
    return null;
  }

  if (!socket) {
    socket = io(`http://${serverIp}`);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
