import { NotifierEvent } from "@/enums/INotifier";
import { IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";

export const registerLobbyListeners = (socket: Socket) => {
  socket.on(NotifierEvent.LOBBY_STATUS, (battle: IBattle) => {
    console.log("Lobby status updated:", battle);
  });
};
