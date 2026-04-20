import { useEffect, useRef, useState } from "react";
import { setReady } from "@/api/lobby";
import { assignPokemon } from "@/api/pokemon";
import { useSessionStore } from "@/store/useSessionStore";
import { NotifierEvent } from "@/enums/INotifier";
import { eventBus } from "@/utils/eventBus";
import { useBattlePlayers } from "./useBattle";

export const useWaitingOpponent = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const [startBattle, setStartBattle] = useState(false);
  const players = useBattlePlayers(nickname);

  const showReadyButton =
    players.current?.isReady !== true &&
    players.current?.pokemonTeam?.length === 3;

  const hasAssignedPokemon = useRef(false);

  useEffect(() => {
    const assignPokemonTeam = async () => {
      if (
        nickname &&
        players.current &&
        players.current.pokemonTeam?.length === 0 &&
        !hasAssignedPokemon.current
      ) {
        hasAssignedPokemon.current = true;
        try {
          await assignPokemon(nickname);
        } catch (error) {
          console.error("Failed to assign pokemon team:", error);
          hasAssignedPokemon.current = false;
        }
      }
    };

    assignPokemonTeam();
  }, [nickname, players.current]);

  const handleReady = async () => {
    if (nickname) {
      await setReady(nickname);
    }
  };

  const handleBattleStart = () => {
    setStartBattle(true);
  };

  useEffect(() => {
    eventBus.on(NotifierEvent.BATTLE_START, handleBattleStart);
    return () => {
      eventBus.off(NotifierEvent.BATTLE_START, handleBattleStart);
    };
  }, []);

  return {
    nickname,
    showReadyButton,
    handleReady,
    startBattle,
    players,
  };
};
