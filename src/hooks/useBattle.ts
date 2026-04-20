import { useMemo } from "react";

import { IPlayer, IPlayers } from "@/interfaces/IPlayer";
import { BattleState, useBattleStore } from "@/store/useBattleStore";
import { useSessionStore } from "@/store/useSessionStore";
import { useShallow } from "zustand/shallow";
import { attack } from "@/api/battle";

export const useBattle = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const battlePlayers = useBattleStore((state) => state.players);
  const currentTurnPlayerId = useBattleStore(
    (state) => state.currentTurnPlayerId,
  );
  const isPlayerTurn = currentTurnPlayerId === nickname;

  const players = useMemo<IPlayers>(() => {
    const current = battlePlayers.find(
      (player) => player.nickname === nickname,
    ) as IPlayer;

    const opponent = battlePlayers.find(
      (player) => player.nickname !== nickname,
    ) as IPlayer | undefined;

    return { current, opponent };
  }, [battlePlayers, nickname]);

  const handleAttack = async () => {
    try {
      await attack(nickname);
    } catch (error) {
      console.error("Error al atacar:", error);
    }
  };

  return {
    nickname,
    players,
    isPlayerTurn,
    handleAttack,
  };
};

export const useBattlePlayers = (nickname: string): IPlayers => {
  return useBattleStore(
    useShallow((state: BattleState) => {
      const current = state.players.find(
        (p) => p.nickname === nickname,
      ) as IPlayer;
      const opponent = state.players.find((p) => p.nickname !== nickname) as
        | IPlayer
        | undefined;
      return { current, opponent };
    }),
  );
};
