import { createTimeline } from "animejs";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useLayoutEffect, useState } from "react";
import { ANIMATION_NAMES } from "@/constants/animations";

export const usePlayerPokemonAppear = () => {
  const playerCharacterAppear = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_CHARACTER_APPEAR),
  );
  const played = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_POKEMON_APPEAR),
  );
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);
  const [pokemonAppear, setPokemonAppear] = useState(false);

  useLayoutEffect(() => {
    if (played) return;

    const tl = createTimeline({
      autoplay: false,
      onComplete: () => {
        markAsPlayed(ANIMATION_NAMES.PLAYER_POKEMON_APPEAR);
      },
    }).add("#player-pokemon", {
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutSine",
      complete: () => {
        setPokemonAppear(true);
      },
    });

    if (playerCharacterAppear && !played) {
      tl.play();
    }
  }, [played, markAsPlayed, playerCharacterAppear]);

  return {
    played,
    pokemonAppear,
  };
};

export const usePlayerPokemonHealthAppear = () => {
  const { played: pokemonPlayerAppear } = usePlayerPokemonAppear();

  const played = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_POKEMON_HEALTH_APPEAR),
  );
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);

  useLayoutEffect(() => {
    if (played) return;

    const tl = createTimeline({
      autoplay: false,
      onComplete: () => {
        markAsPlayed(ANIMATION_NAMES.PLAYER_POKEMON_HEALTH_APPEAR);
      },
    })
      .add("#player-pokemon-health-bar", {
        opacity: [0, 1],
        duration: 800,
        easing: "easeInOutSine",
      })
      .add(
        "#opponent-pokemon-health-bar",
        {
          opacity: [0, 1],
          duration: 800,
          easing: "easeInOutSine",
        },
        "-=800",
      );

    if (pokemonPlayerAppear && !played) {
      tl.play();
    }
  }, [played, markAsPlayed, pokemonPlayerAppear]);
  return {
    played,
  };
};
