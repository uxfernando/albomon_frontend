import { createTimeline } from "animejs";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useLayoutEffect, useState } from "react";
import { ANIMATION_NAMES } from "@/constants/animations";

export const usePlayerAttackAppear = () => {
  const pokemonAppear = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_POKEMON_APPEAR),
  );
  const played = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_ATTACK_APPEAR),
  );
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);
  const [attackAppear, setAttackAppear] = useState(false);

  useLayoutEffect(() => {
    if (played) return;

    const tl = createTimeline({
      autoplay: false,
      onComplete: () => {
        markAsPlayed(ANIMATION_NAMES.PLAYER_ATTACK_APPEAR);
      },
    }).add("#player-pokemon", {
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutSine",
      complete: () => {
        setAttackAppear(true);
      },
    });

    if (pokemonAppear && !played) {
      tl.play();
    }
  }, [played, markAsPlayed, pokemonAppear]);

  return {
    played,
    attackAppear,
  };
};
