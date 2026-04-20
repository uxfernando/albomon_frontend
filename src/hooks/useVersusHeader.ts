import { useSessionStore } from "@/store/useSessionStore";
import { useBattlePlayers } from "./useBattle";

export const useVersusHeader = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const players = useBattlePlayers(nickname);

  const waitingOpponent = !players.opponent;
  return {
    nickname,
    players,
    waitingOpponent,
  };
};
