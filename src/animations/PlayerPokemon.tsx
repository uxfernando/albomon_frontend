import { createTimeline } from "animejs";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useLayoutEffect, useState } from "react";

export const usePlayerPokemonAppear = () => {
  const playerCharacterName = "player-character-appear";
  const animationName = "player-pokemon-appear";

  const playerCharacterAppear = useAnimationStore((state) =>
    state.hasPlayed(playerCharacterName),
  );
  const played = useAnimationStore((state) => state.hasPlayed(animationName));
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);
  const [pokemonAppear, setPokemonAppear] = useState(false);

  useLayoutEffect(() => {
    if (played) return;

    const tl = createTimeline({
      autoplay: false,
      onComplete: () => {
        markAsPlayed(animationName);
      },
    }).add("#player-pokemon", {
      opacity: [0, 1],
      duration: 500,
      complete: () => {
        setPokemonAppear(true);
      },
    });

    if (playerCharacterAppear && !played) {
      tl.play();
    }
  }, [played, markAsPlayed, playerCharacterAppear]);

  return {
    played: Boolean(played),
    pokemonAppear,
  };
};

export const usePlayerPokemonHealthAppear = () => {
  const { played: pokemonPlayerAppear } = usePlayerPokemonAppear();

  const animationName = "player-pokemon-health-appear";
  const played = useAnimationStore((state) => state.hasPlayed(animationName));
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);

  useLayoutEffect(() => {
    if (played) return;

    const tl = createTimeline({
      autoplay: false,
      onComplete: () => {
        markAsPlayed(animationName);
      },
    })
      .add("#player-pokemon-health-bar", {
        opacity: [0, 1],
        duration: 800,
      })
      .add(
        "#opponent-pokemon-health-bar",
        {
          opacity: [0, 1],
          duration: 800,
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
