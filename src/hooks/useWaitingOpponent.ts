import { useEffect } from "react";
import { setReady } from "@/api/lobby";
import { assignPokemon } from "@/api/pokemon";
import { useSessionStore } from "@/store/useSessionStore";
import { NotifierEvent } from "@/enums/INotifier";
import { eventBus } from "@/utils/eventBus";
import { useBattlePlayers } from "./useBattle";
import { useBattleStore } from "@/store/useBattleStore";

export const useWaitingOpponent = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const setBattle = useBattleStore((state) => state.setBattle);
  const players = useBattlePlayers(nickname);

  const hasCurrentPlayer = !!players.current;
  const hasOpponent = !!players.opponent;
  const currentPlayerNotReady = players.current?.isReady === false;
  const opponentPlayerNotReady = players.opponent?.isReady === false;
  const currentHasFullTeam = players.current?.pokemonTeam?.length === 3;
  const opponentHasFullTeam = players.opponent?.pokemonTeam?.length === 3;

  const showReadyButton =
    hasCurrentPlayer &&
    currentPlayerNotReady &&
    currentHasFullTeam &&
    hasOpponent;

  const showWaitingMessage =
    hasOpponent &&
    !showReadyButton &&
    opponentHasFullTeam &&
    opponentPlayerNotReady;

  useEffect(() => {
    const assignPokemonTeam = async () => {
      if (players.current && players.current.pokemonTeam.length === 0) {
        try {
          const { battle } = await assignPokemon(nickname);
          setBattle(battle);
        } catch (error) {
          console.error("Failed to assign pokemon team:", error);
        }
      }
    };

    assignPokemonTeam();
  }, []);

  const handleReady = async () => {
    try {
      const { battle } = await setReady(nickname);
      setBattle(battle);
    } catch (error) {
      console.error("Failed to set player ready:", error);
    }
  };

  const handleBattleStart = () => {
    // NOTE: Navigation is handled in Guards after lobby_status update battle store
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
    showWaitingMessage,
    handleReady,
    players,
  };
};
