import { useEffect, useMemo, useState } from "react";

import { IPlayer, IPlayers } from "@/interfaces/IPlayer";
import { BattleState, useBattleStore } from "@/store/useBattleStore";
import { useSessionStore } from "@/store/useSessionStore";
import { useShallow } from "zustand/shallow";
import { attack } from "@/api/battle";
import { eventBus } from "@/utils/eventBus";
import { NotifierEvent } from "@/enums/INotifier";

export const useBattle = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const status = useBattleStore((state) => state.status);
  const setBattle = useBattleStore((state) => state.setBattle);
  const battlePlayers = useBattleStore((state) => state.players);
  const currentTurnPlayerId = useBattleStore(
    (state) => state.currentTurnPlayerId,
  );
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
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
      setIsPlayerAttacking(true);
      const { battle } = await attack(nickname);
      setBattle(battle);
    } catch (error) {
      console.error("Error al atacar:", error);
    } finally {
      setIsPlayerAttacking(false);
    }
  };

  return {
    nickname,
    status,
    players,
    isPlayerTurn,
    isPlayerAttacking,
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

export const useBattleEnd = () => {
  const handleBattleEnd = (winnerId: string) => {
    // NOTE: Navigation is handled in Guards after lobby_status update battle store
  };

  useEffect(() => {
    eventBus.on(NotifierEvent.BATTLE_END, handleBattleEnd);
    return () => {
      eventBus.off(NotifierEvent.BATTLE_END, handleBattleEnd);
    };
  }, []);
};
