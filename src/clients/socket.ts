import { io, Socket } from "socket.io-client";
import { registerAllSocketListeners } from "@/sockets";

export let socket: Socket | null = null;

export const connectSocket = (serverIp: string, nickname: string) => {
  if (!serverIp) {
    console.error("No server IP provided for socket connection");
    return null;
  }

  if (!socket) {
    socket = io(serverIp, {
      query: {
        nickname,
      },
    });

    registerAllSocketListeners(socket);
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
