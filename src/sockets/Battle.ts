import { NotifierEvent } from "@/enums/INotifier";
import { IBattle } from "@/interfaces/IBattle";
import { Socket } from "socket.io-client";
import { eventBus } from "@/utils/eventBus";
import { useBattleStore } from "@/store/useBattleStore";

export const registerBattleListeners = (socket: Socket) => {
  socket.on(NotifierEvent.BATTLE_START, (battle: IBattle) => {
    eventBus.emit(NotifierEvent.BATTLE_START, battle);
  });

  socket.on(
    NotifierEvent.TURN_RESULT,
    ({ battle, damageDetalt }: { battle: IBattle; damageDetalt: number }) => {
      useBattleStore.getState().setBattle(battle);
    },
  );
};
