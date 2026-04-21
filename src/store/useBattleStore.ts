import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IBattle } from "@/interfaces/IBattle";
import { BattleStatus } from "@/enums/IBattle";

export interface BattleState extends IBattle {
  setBattle: (battle: IBattle) => void;
  getBattleStatus: () => BattleStatus;
  clearBattle: () => void;
}

const defaultBattle: IBattle = {
  id: "",
  players: [],
  status: BattleStatus.Waiting,
  winnerId: null,
  currentTurnPlayerId: null,
};

export const useBattleStore = create<BattleState>()(
  persist(
    (set, get) => ({
      ...defaultBattle,
      setBattle: (battle) => set({ ...battle }),
      getBattleStatus: () => get().status,
      clearBattle: () => set({ ...defaultBattle }),
    }),
    {
      name: "battle-store",
    },
  ),
);
