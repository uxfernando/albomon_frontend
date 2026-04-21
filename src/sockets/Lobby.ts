import { NotifierEvent } from "@/enums/INotifier";
import { IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { useBattleStore } from "@/store/useBattleStore";
import { eventBus } from "@/utils/eventBus";

export const registerLobbyListeners = (socket: Socket) => {
  socket.on(NotifierEvent.LOBBY_STATUS, (battle: IBattle) => {
    useBattleStore.getState().setBattle(battle);
  });

  socket.on(NotifierEvent.OPPONENT_DISCONNECT, (nickname: string) => {
    eventBus.emit(NotifierEvent.OPPONENT_DISCONNECT, nickname);
  });
};
