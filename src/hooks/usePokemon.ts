import { useSessionStore } from "@/store/useSessionStore";
import { useBattlePlayers } from "./useBattle";
import { useMemo, useState, useEffect } from "react";
import { IPokemon } from "@/interfaces/IPokemon";
import { eventBus } from "@/utils/eventBus";
import { NotifierEvent } from "@/enums/INotifier";
import { BattleTurnResult } from "@/interfaces/IBattle";

export const usePokemon = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const players = useBattlePlayers(nickname);

  const currentActivePokemon = useMemo<IPokemon | undefined>(() => {
    if (!players.current?.pokemonTeam) return undefined;
    return players.current.pokemonTeam.find((p) => p.currentHp > 0);
  }, [players.current?.pokemonTeam]);

  const opponentActivePokemon = useMemo<IPokemon | undefined>(() => {
    if (!players.opponent?.pokemonTeam) return undefined;
    return players.opponent.pokemonTeam.find((p) => p.currentHp > 0);
  }, [players.opponent?.pokemonTeam]);

  return {
    currentActivePokemon,
    opponentActivePokemon,
  };
};

export const usePokemonDamage = () => {
  const nickname = useSessionStore((state) => state.nickname);

  const [playerDamage, setPlayerDamage] = useState<number | null>(null);
  const [opponentDamage, setOpponentDamage] = useState<number | null>(null);

  useEffect(() => {
    const handleTurnResult = (turnResult: BattleTurnResult) => {
      if (turnResult.defender === nickname) {
        setPlayerDamage(turnResult.damageDealt);
        setTimeout(() => setPlayerDamage(null), 1500);
      } else {
        setOpponentDamage(turnResult.damageDealt);
        setTimeout(() => setOpponentDamage(null), 1500);
      }
    };

    eventBus.on(NotifierEvent.TURN_RESULT, handleTurnResult);

    return () => {
      eventBus.off(NotifierEvent.TURN_RESULT, handleTurnResult);
    };
  }, [nickname]);

  return { playerDamage, opponentDamage };
};
