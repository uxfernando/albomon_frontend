import { IPlayers } from "@/interfaces/IPlayer";

export const useVersusHeader = (players: IPlayers) => {
  const waitingOpponent = !players.opponent;

  return {
    waitingOpponent,
  };
};
