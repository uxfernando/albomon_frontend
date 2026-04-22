import { ANIMATION_NAMES } from "@/constants/animations";
import { useAnimationStore } from "@/store/useAnimationStore";
import { createTimeline } from "animejs";
import { useLayoutEffect, useState } from "react";
import { eventBus } from "@/utils/eventBus";
import { IPokemon } from "@/interfaces/IPokemon";
import { useThrowOpponentPokeball, useThrowPlayerPokeball } from "./Player";

export const usePokemonAnimation = (
  currentPokemon?: IPokemon,
  opponentPokemon?: IPokemon,
) => {
  const {
    playAnimation: playPlayerPokemonAppear,
    resetAnimation: resetPlayerPokemonAppear,
  } = usePokemonAppear("player-pokemon");
  const {
    playAnimation: playOpponentPokemonAppear,
    resetAnimation: resetOpponentPokemonAppear,
  } = usePokemonAppear("opponent-pokemon");

  const { playAnimation: playPlayerPokemonDisappear } =
    usePokemonDisappear("player-pokemon");
  const { playAnimation: playOpponentPokemonDisappear } =
    usePokemonDisappear("opponent-pokemon");

  //   const { playAnimation: playPlayerThrowPokeball } = useThrowPlayerPokeball();
  //   const { playAnimation: playOpponentThrowPokeball } =
  //     useThrowOpponentPokeball();

  const playerThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_THROW_POKEBALL),
  );
  const opponentThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.OPPONENT_THROW_POKEBALL),
  );
  const playerPokemonAppearPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_POKEMON_APPEAR),
  );
  const opponentPokemonAppearPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.OPPONENT_POKEMON_APPEAR),
  );

  useLayoutEffect(() => {
    if (
      playerThrowPokeballPlayed &&
      !playerPokemonAppearPlayed &&
      currentPokemon
    ) {
      playPlayerPokemonAppear();
    }
    if (
      opponentThrowPokeballPlayed &&
      !opponentPokemonAppearPlayed &&
      opponentPokemon
    ) {
      playOpponentPokemonAppear();
    }
  }, [
    playerThrowPokeballPlayed,
    playerPokemonAppearPlayed,
    opponentThrowPokeballPlayed,
    opponentPokemonAppearPlayed,
    currentPokemon,
    opponentPokemon,
  ]);

  // Handle death animations
  useLayoutEffect(() => {
    const handlePokemonDeath = (data: { player: string }) => {
      if (data.player === "current") {
        playPlayerPokemonDisappear();

        setTimeout(() => {
          resetPlayerPokemonAppear();
          setTimeout(() => playPlayerPokemonAppear(), 100);
        }, 1000);
      } else if (data.player === "opponent") {
        playOpponentPokemonDisappear();

        setTimeout(() => {
          resetOpponentPokemonAppear();
          setTimeout(() => playOpponentPokemonAppear(), 100);
        }, 1000);
      }
    };

    eventBus.on("POKEMON_DIED", handlePokemonDeath);
    return () => {
      eventBus.off("POKEMON_DIED", handlePokemonDeath);
    };
  }, []);

  return {
    playerThrowPokeballPlayed,
    opponentThrowPokeballPlayed,
    playerPokemonAppearPlayed,
    opponentPokemonAppearPlayed,
  };
};

export const usePokemonAppear = (pokemonId: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetAnimation = () => {
    setIsVisible(false);
    setIsPlaying(false);
  };

  const playAnimation = () => {
    if (isPlaying || isVisible) return;

    const containerSelector = `#${pokemonId}`;
    const healthBarSelector = `#${pokemonId} > div:nth-child(1)`;
    const imageSelector = `#${pokemonId} > div:nth-child(2)`;

    if (!document.querySelector(containerSelector)) return;

    setIsPlaying(true);

    const tl = createTimeline({
      autoplay: true,
      onComplete: () => {
        setIsVisible(true);
        setIsPlaying(false);
      },
    });

    // Appear: Primero el pokemon, después la barra
    tl.set(containerSelector, { opacity: 1 })
      .set(healthBarSelector, { opacity: 0 })
      .set(imageSelector, { opacity: 0 })
      .add(imageSelector, {
        opacity: [0, 1],
        duration: 500,
        easing: "easeInOutQuad",
      })
      .add(
        healthBarSelector,
        {
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 400,
          easing: "easeInOutQuad",
        },
        "-=200",
      );
  };

  return {
    playAnimation,
    resetAnimation,
    isVisible,
    isPlaying,
  };
};

export const usePokemonDisappear = (pokemonId: string) => {
  const [isDisappeared, setIsDisappeared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetAnimation = () => {
    setIsDisappeared(false);
    setIsPlaying(false);
  };

  const playAnimation = () => {
    if (isPlaying || isDisappeared) return;

    const containerSelector = `#${pokemonId}`;
    const healthBarSelector = `#${pokemonId} > div:nth-child(1)`;
    const imageSelector = `#${pokemonId} > div:nth-child(2)`;

    if (!document.querySelector(containerSelector)) return;

    setIsPlaying(true);

    const tl = createTimeline({
      autoplay: true,
      onComplete: () => {
        setIsDisappeared(true);
        setIsPlaying(false);
        resetAnimation(); // Reset state so it can be played again
      },
    });

    // Disappear: Primero la barra, después el pokemon
    tl.add(healthBarSelector, {
      opacity: [1, 0],
      translateY: [0, -10],
      duration: 400,
      easing: "easeInQuad",
    })
      .add(
        imageSelector,
        {
          opacity: [1, 0],
          duration: 500,
          easing: "easeInQuad",
        },
        "-=200",
      )
      .set(containerSelector, { opacity: 0 });
  };

  return {
    playAnimation,
    resetAnimation,
    isDisappeared,
    isPlaying,
  };
};
