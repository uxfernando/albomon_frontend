import { createTimeline } from "animejs";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useLayoutEffect, useRef, useState } from "react";
import { ANIMATION_NAMES } from "@/constants/animations";
import { eventBus } from "@/utils/eventBus";
import { BusEvent } from "@/enums/INotifier";

export const usePlayersAnimation = () => {
  const playerThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_THROW_POKEBALL),
  );
  const opponentThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.OPPONENT_THROW_POKEBALL),
  );
  const markAsPlayed = useAnimationStore((state) => state.markAsPlayed);

  const {
    playAnimation: playerPlayAnimation,
    isPlaying: isPlayingPlayer,
    animationCompleted: playerAnimationCompleted,
  } = useThrowPlayerPokeball();
  const {
    playAnimation: opponentPlayAnimation,
    isPlaying: isPlayingOpponent,
    animationCompleted: opponentAnimationCompleted,
  } = useThrowOpponentPokeball();

  const playAnimations = () => {
    if (!playerThrowPokeballPlayed) {
      playerPlayAnimation();
    }

    if (!opponentThrowPokeballPlayed) {
      opponentPlayAnimation();
    }
  };

  useLayoutEffect(() => {
    if (playerAnimationCompleted) {
      markAsPlayed(ANIMATION_NAMES.PLAYER_THROW_POKEBALL);
    }
    if (opponentAnimationCompleted) {
      markAsPlayed(ANIMATION_NAMES.OPPONENT_THROW_POKEBALL);
    }
  }, [playerAnimationCompleted, opponentAnimationCompleted]);

  useLayoutEffect(() => {
    playAnimations();
  }, []);

  useLayoutEffect(() => {
    const handleThrowPokeball = (data: { player: string }) => {
      if (data.player === "current") {
        playerPlayAnimation();
      } else {
        opponentPlayAnimation();
      }
    };

    eventBus.on(BusEvent.THROW_POKEBALL, handleThrowPokeball);

    return () => {
      eventBus.off(BusEvent.THROW_POKEBALL, handleThrowPokeball);
    };
  }, []);

  return {
    playerThrowPokeballPlayed,
    opponentThrowPokeballPlayed,
    isPlayingPlayer,
    isPlayingOpponent,
  };
};

export const useThrowPlayerPokeball = () => {
  const tl = useRef<ReturnType<typeof createTimeline> | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    setupAnimation();
  }, []);

  const setupAnimation = () => {
    tl.current = createTimeline({
      autoplay: false,
      onComplete: () => {
        setAnimationCompleted(true);
        setIsPlaying(false);
      },
      onBegin: () => {
        setIsPlaying(true);
      },
    })
      .add("#player-pokeball", {
        opacity: 1,
        duration: 0,
      })
      .add("#player-pokeball", {
        keyframes: {
          "0%": { left: "5%", bottom: "0%", width: "8%", rotate: "0deg" },
          "5%": { left: "7%", bottom: "6%", width: "7.8%", rotate: "30deg" },
          "10%": { left: "10%", bottom: "12%", width: "7.5%", rotate: "70deg" },
          "15%": { left: "13%", bottom: "18%", width: "7%", rotate: "110deg" },
          "20%": {
            left: "16%",
            bottom: "23%",
            width: "6.5%",
            rotate: "150deg",
          },
          "25%": { left: "19%", bottom: "28%", width: "6%", rotate: "190deg" },
          "30%": {
            left: "22%",
            bottom: "32%",
            width: "5.7%",
            rotate: "230deg",
          },
          "35%": {
            left: "24%",
            bottom: "34%",
            width: "5.3%",
            rotate: "270deg",
          },
          "40%": { left: "26%", bottom: "35%", width: "5%", rotate: "320deg" }, // pico
          "45%": { left: "27%", bottom: "31%", width: "5%", rotate: "355deg" },
          "50%": { left: "28%", bottom: "26%", width: "5%", rotate: "380deg" },
          "55%": { left: "28%", bottom: "20%", width: "5%", rotate: "400deg" },
          "60%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" }, // suelo
          "64%": { left: "28%", bottom: "21%", width: "5%", rotate: "420deg" },
          "68%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" },
          "72%": { left: "28%", bottom: "19%", width: "5%", rotate: "420deg" },
          "76%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" },
          "80%": { left: "28%", bottom: "18%", width: "5%", rotate: "420deg" },
          "84%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" },
          "90%": {
            left: "28%",
            bottom: "17.3%",
            width: "5%",
            rotate: "420deg",
          },
          "95%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" },
          "100%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" },
        },
        duration: 1200,
        easing: "easeInOutSine",
      })
      .add("#player-pokeball", {
        keyframes: {
          "0%": { rotate: "420deg" },
          "20%": { rotate: "430deg" },
          "40%": { rotate: "410deg" },
          "60%": { rotate: "428deg" },
          "80%": { rotate: "414deg" },
          "100%": { rotate: "420deg" },
        },
        loop: 1,
        duration: 1200,
        easing: "easeInOutSine",
      })
      .add(
        "#player-lightning-spell",
        {
          opacity: 1,
          duration: 500,
        },
        "-=1200",
      )
      .add("#player-pokeball", {
        opacity: 0,
        duration: 500,
      })
      .set("#player-pokeball", {
        opacity: 0,
      })
      .set("#player-lightning-spell", {
        opacity: 0,
      });
  };

  const playAnimation = () => {
    setAnimationCompleted(false);
    setIsPlaying(false);
    tl.current?.restart();
  };

  return {
    playAnimation,
    animationCompleted,
    isPlaying,
  };
};

export const useThrowOpponentPokeball = () => {
  const tl = useRef<ReturnType<typeof createTimeline> | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useLayoutEffect(() => {
    setupAnimation();
  }, []);

  const setupAnimation = () => {
    tl.current = createTimeline({
      autoplay: false,
      onComplete: () => {
        setAnimationCompleted(true);
        setIsPlaying(false);
      },
      onBegin: () => {
        setIsPlaying(true);
      },
    })
      .add("#opponent-lightning-spell", {
        opacity: 1,
        duration: 500,
      })
      .add("#opponent-lightning-spell", {
        opacity: 1,
        duration: 1000,
      })
      .add("#opponent-lightning-spell", {
        opacity: 0,
        duration: 500,
      });
  };

  const playAnimation = () => {
    setAnimationCompleted(false);
    setIsPlaying(false);
    tl.current?.restart();
  };

  return {
    playAnimation,
    animationCompleted,
    isPlaying,
  };
};
