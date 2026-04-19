import { useEffect, useMemo, useRef } from "react";
import { setReady } from "@/api/lobby";
import { assignPokemon } from "@/api/pokemon";
import { IPlayer, IPlayers } from "@/interfaces/IPlayer";
import { useBattleStore } from "@/store/useBattleStore";
import { useSessionStore } from "@/store/useSessionStore";

export const useWaitingOpponent = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const battlePlayers = useBattleStore((state) => state.players);

  const players = useMemo<IPlayers>(() => {
    const current = battlePlayers.find(
      (player) => player.nickname === nickname,
    ) as IPlayer;

    const opponent = battlePlayers.find(
      (player) => player.nickname !== nickname,
    ) as IPlayer | undefined;

    return { current, opponent };
  }, [battlePlayers, nickname]);

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

  return {
    nickname,
    showReadyButton,
    players,
    handleReady,
  };
};
