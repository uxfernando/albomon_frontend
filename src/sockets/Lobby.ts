import { NotifierEvent } from "@/enums/INotifier";
import { IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { useBattleStore } from "@/store/useBattleStore";

export const registerLobbyListeners = (socket: Socket) => {
  socket.on(NotifierEvent.LOBBY_STATUS, (battle: IBattle) => {
    useBattleStore.getState().setBattle(battle);
  });

  socket.on(NotifierEvent.OPPONENT_DISCONNECT, (nickname: string) => {
    console.error("Opponent disconnected", nickname);
    alert(`El oponente ${nickname} se ha desconectado.`);
  });
};
