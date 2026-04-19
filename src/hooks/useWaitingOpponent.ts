import { IPlayer } from "@/interfaces/IPlayer";
import { BattleState, useBattleStore } from "@/store/useBattleStore";
import { useSessionStore } from "@/store/useSessionStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useWaitingOpponent = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const battleState = useBattleStore((state) => state);
  const [showReadyButton, setShowReadyButton] = useState(false);

  const selectPlayers = (state: BattleState, nickname: string) => {
    const current = state.players.find(
      (player) => player.nickname === nickname,
    ) as IPlayer | undefined;

    const opponent = state.players.find(
      (player) => player.nickname !== nickname,
    ) as IPlayer | undefined;

    return { current, opponent };
  };

  return {
    nickname,
    showReadyButton,
    players: selectPlayers(battleState, nickname),
  };
};
