import { Socket } from "socket.io-client";
import { registerBaseListeners } from "./baseListeners";
import { registerLobbyListeners } from "./Lobby";

export const registerAllSocketListeners = (socket: Socket) => {
  if (!socket) return;

  registerBaseListeners(socket);
  registerLobbyListeners(socket);
};
