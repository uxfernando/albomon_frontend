import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IBattle } from "@/interfaces/IBattle";
import { BattleStatus } from "@/enums/IBattle";

export interface BattleState extends IBattle {
  setBattle: (battle: IBattle) => void;
  getBattleStatus: () => BattleStatus;
}

export const useBattleStore = create<BattleState>()(
  persist(
    (set, get) => ({
      id: "",
      players: [],
      status: BattleStatus.Waiting,
      winner: null,
      currentTurnPlayerId: null,
      setBattle: (battle) => set({ ...battle }),
      getBattleStatus: () => get().status,
    }),
    {
      name: "battle-store",
    },
  ),
);
