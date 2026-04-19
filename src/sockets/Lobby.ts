import { NotifierEvent } from "@/enums/INotifier";
import { IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { useBattleStore } from "@/store/useBattleStore";

export const registerLobbyListeners = (socket: Socket) => {
  socket.on(NotifierEvent.LOBBY_STATUS, (battle: IBattle) => {
    console.log("Received lobby status:", battle);
    useBattleStore.getState().setBattle(battle);
  });
};
