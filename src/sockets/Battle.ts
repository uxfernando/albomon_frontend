import { NotifierEvent } from "@/enums/INotifier";
import { BattleTurnResult, IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { eventBus } from "@/utils/eventBus";

export const registerBattleListeners = (socket: Socket) => {
  socket.on(NotifierEvent.BATTLE_START, (battle: IBattle) => {
    eventBus.emit(NotifierEvent.BATTLE_START, battle);
  });

  socket.on(NotifierEvent.TURN_RESULT, (turnResult: BattleTurnResult) => {
    eventBus.emit(NotifierEvent.TURN_RESULT, turnResult);
  });

  socket.on(NotifierEvent.BATTLE_END, (winnerId: string) => {
    console.log("Battle end", winnerId);
    eventBus.emit(NotifierEvent.BATTLE_END, winnerId);
  });
};
