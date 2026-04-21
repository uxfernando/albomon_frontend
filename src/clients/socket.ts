import { io, Socket } from "socket.io-client";
import { registerAllSocketListeners } from "@/sockets";
import { API_BASE_URL } from "@/config/api";

export let socket: Socket | null = null;

export const connectSocket = (nickname: string) => {
  if (!socket) {
    socket = io(API_BASE_URL, {
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
