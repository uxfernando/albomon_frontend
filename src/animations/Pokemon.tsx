import { ANIMATION_NAMES } from "@/constants/animations";
import { useAnimationStore } from "@/store/useAnimationStore";
import { createTimeline } from "animejs";
import { useLayoutEffect, useState } from "react";

export const usePokemonAnimation = () => {
  const { playAnimation: playPlayerAppear } =
    usePokemonAppear("player-pokemon");
  const { playAnimation: playOpponentAppear } =
    usePokemonAppear("opponent-pokemon");

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
    if (playerThrowPokeballPlayed && !playerPokemonAppearPlayed) {
      playPlayerAppear();
    }
    if (opponentThrowPokeballPlayed && !opponentPokemonAppearPlayed) {
      playOpponentAppear();
    }
  }, [
    playerThrowPokeballPlayed,
    playerPokemonAppearPlayed,
    opponentThrowPokeballPlayed,
    opponentPokemonAppearPlayed,
  ]);

  const initialPlayer = playerThrowPokeballPlayed && playerPokemonAppearPlayed;
  const initialOpponent =
    opponentThrowPokeballPlayed && opponentPokemonAppearPlayed;
  return {
    playerThrowPokeballPlayed,
    opponentThrowPokeballPlayed,
    playerPokemonAppearPlayed,
    opponentPokemonAppearPlayed,
    initialPlayer,
    initialOpponent,
  };
};

export const usePokemonAppear = (pokemonId: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    if (isPlaying || isVisible) return;
    setIsPlaying(true);

    const containerSelector = `#${pokemonId}`;
    const healthBarSelector = `#${pokemonId} > div:nth-child(1)`;
    const imageSelector = `#${pokemonId} > div:nth-child(2)`;

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
    isVisible,
    isPlaying,
  };
};

export const usePokemonDisappear = (pokemonId: string) => {
  const [isDisappeared, setIsDisappeared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    if (isPlaying || isDisappeared) return;
    setIsPlaying(true);

    const containerSelector = `#${pokemonId}`;
    const healthBarSelector = `#${pokemonId} > div:nth-child(1)`;
    const imageSelector = `#${pokemonId} > div:nth-child(2)`;

    const tl = createTimeline({
      autoplay: true,
      onComplete: () => {
        setIsDisappeared(true);
        setIsPlaying(false);
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
    isDisappeared,
    isPlaying,
  };
};
