import { Socket } from "socket.io-client";
import { registerBaseListeners } from "./base";
import { registerLobbyListeners } from "./Lobby";
import { registerBattleListeners } from "./Battle";

export const registerAllSocketListeners = (socket: Socket) => {
  if (!socket) return;

  registerBaseListeners(socket);
  registerLobbyListeners(socket);
  registerBattleListeners(socket);
};
