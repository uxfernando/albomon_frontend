import { useSessionStore } from "@/store/useSessionStore";
import { useBattlePlayers } from "./useBattle";
import { useMemo, useState, useEffect, useRef } from "react";
import { eventBus } from "@/utils/eventBus";
import { BusEvent, NotifierEvent } from "@/enums/INotifier";
import { BattleTurnResult } from "@/interfaces/IBattle";
import { ANIMATION_DURATION } from "@/constants/animations";

export const usePokemon = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const players = useBattlePlayers(nickname);

  const [currentActiveIdx, setCurrentActiveIdx] = useState<number>(-1);
  const [opponentActiveIdx, setOpponentActiveIdx] = useState<number>(-1);

  const realCurrentActiveIdx = useMemo(() => {
    if (!players.current?.pokemonTeam) return -1;
    return players.current.pokemonTeam.findIndex((p) => p.currentHp > 0);
  }, [players.current?.pokemonTeam]);

  const realOpponentActiveIdx = useMemo(() => {
    if (!players.opponent?.pokemonTeam) return -1;
    return players.opponent.pokemonTeam.findIndex((p) => p.currentHp > 0);
  }, [players.opponent?.pokemonTeam]);

  useEffect(() => {
    if (realCurrentActiveIdx === -1) {
      setCurrentActiveIdx(-1);
      return;
    }

    if (currentActiveIdx === -1) {
      setCurrentActiveIdx(realCurrentActiveIdx);
    } else if (currentActiveIdx !== realCurrentActiveIdx) {
      const displayedPokemon = players.current?.pokemonTeam?.[currentActiveIdx];
      if (displayedPokemon && displayedPokemon.currentHp <= 0) {
        const timer = setTimeout(() => {
          setCurrentActiveIdx(realCurrentActiveIdx);
        }, ANIMATION_DURATION.POKEMON_SWAP);
        return () => clearTimeout(timer);
      } else {
        setCurrentActiveIdx(realCurrentActiveIdx);
      }
    }
  }, [realCurrentActiveIdx, currentActiveIdx, players.current?.pokemonTeam]);

  useEffect(() => {
    if (realOpponentActiveIdx === -1) {
      setOpponentActiveIdx(-1);
      return;
    }

    if (opponentActiveIdx === -1) {
      setOpponentActiveIdx(realOpponentActiveIdx);
    } else if (opponentActiveIdx !== realOpponentActiveIdx) {
      const displayedPokemon =
        players.opponent?.pokemonTeam?.[opponentActiveIdx];
      if (displayedPokemon && displayedPokemon.currentHp <= 0) {
        const timer = setTimeout(() => {
          setOpponentActiveIdx(realOpponentActiveIdx);
        }, ANIMATION_DURATION.POKEMON_SWAP);
        return () => clearTimeout(timer);
      } else {
        setOpponentActiveIdx(realOpponentActiveIdx);
      }
    }
  }, [realOpponentActiveIdx, opponentActiveIdx, players.opponent?.pokemonTeam]);

  const currentActivePokemon =
    currentActiveIdx !== -1
      ? players.current?.pokemonTeam?.[currentActiveIdx]
      : undefined;

  const opponentActivePokemon =
    opponentActiveIdx !== -1
      ? players.opponent?.pokemonTeam?.[opponentActiveIdx]
      : undefined;

  return {
    currentActivePokemon,
    opponentActivePokemon,
  };
};

export const usePokemonDamage = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();

  const activePokemonsRef = useRef({
    currentActivePokemon,
    opponentActivePokemon,
  });

  useEffect(() => {
    activePokemonsRef.current = { currentActivePokemon, opponentActivePokemon };
  }, [currentActivePokemon, opponentActivePokemon]);

  const [playerDamage, setPlayerDamage] = useState<number | null>(null);
  const [opponentDamage, setOpponentDamage] = useState<number | null>(null);

  useEffect(() => {
    const handleTurnResult = (turnResult: BattleTurnResult) => {
      if (turnResult.defender === nickname) {
        const hp =
          activePokemonsRef.current.currentActivePokemon?.currentHp || 0;

        setPlayerDamage(turnResult.damageDealt);

        if (hp - turnResult.damageDealt <= 0) {
          eventBus.emit(BusEvent.POKEMON_DEFEAT, { player: "current" });

          setTimeout(() => {
            eventBus.emit(BusEvent.POKEMON_DIED, { player: "current" });
          }, ANIMATION_DURATION.POKEMON_DAMAGE);
        }

        setTimeout(() => {
          setPlayerDamage(null);
        }, ANIMATION_DURATION.POKEMON_DAMAGE);
      } else {
        const hp =
          activePokemonsRef.current.opponentActivePokemon?.currentHp || 0;

        setOpponentDamage(turnResult.damageDealt);

        if (hp - turnResult.damageDealt <= 0) {
          eventBus.emit(BusEvent.POKEMON_DEFEAT, { player: "opponent" });
          setTimeout(() => {
            eventBus.emit(BusEvent.POKEMON_DIED, { player: "opponent" });
          }, ANIMATION_DURATION.POKEMON_DAMAGE);
        }

        setTimeout(() => {
          setOpponentDamage(null);
        }, ANIMATION_DURATION.POKEMON_DAMAGE);
      }
    };

    eventBus.on(NotifierEvent.TURN_RESULT, handleTurnResult);

    return () => {
      eventBus.off(NotifierEvent.TURN_RESULT, handleTurnResult);
    };
  }, [nickname]);

  return { playerDamage, opponentDamage };
};
