import { useSessionStore } from "@/store/useSessionStore";
import { useBattlePlayers } from "./useBattle";
import { useMemo } from "react";
import { IPokemon } from "@/interfaces/IPokemon";

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
