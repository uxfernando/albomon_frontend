import { NotifierEvent } from "@/enums/INotifier";
import { BattleTurnResult, IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { eventBus } from "@/utils/eventBus";
import { useBattleStore } from "@/store/useBattleStore";
import { useAnimationStore } from "@/store/useAnimationStore";

export const registerBattleListeners = (socket: Socket) => {
  socket.on(NotifierEvent.BATTLE_START, (battle: IBattle) => {
    eventBus.emit(NotifierEvent.BATTLE_START, battle);
  });

  socket.on(NotifierEvent.RESET_BATTLE, (battle: IBattle) => {
    useBattleStore.getState().setBattle(battle);
    useAnimationStore.getState().clearPlayed();
    eventBus.emit(NotifierEvent.RESET_BATTLE, battle);
  });

  socket.on(NotifierEvent.TURN_RESULT, (turnResult: BattleTurnResult) => {
    eventBus.emit(NotifierEvent.TURN_RESULT, turnResult);
  });

  socket.on(NotifierEvent.BATTLE_END, (winnerId: string) => {
    eventBus.emit(NotifierEvent.BATTLE_END, winnerId);
  });
};
