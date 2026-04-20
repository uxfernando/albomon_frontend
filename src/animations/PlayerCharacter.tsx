import { createTimeline } from "animejs";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useLayoutEffect } from "react";

export const usePlayerAppear = () => {
  const { markAsPlayed } = useAnimationStore.getState();
  const animationName = "player-character-appear";
  const played = useAnimationStore((state) => state.hasPlayed(animationName));

  if (played) {
    return {
      played: true,
    };
  }

  useLayoutEffect(() => {
    const tl = createTimeline();
    tl.set("#pokeball", {
      opacity: 0,
    })
      .add("#player-character", {
        translateX: ["-100%", "0px"],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutQuad",
      })
      .add("#pokeball", {
        opacity: 1,
        delay: 200,
        duration: 0,
      })
      .add("#pokeball", {
        keyframes: {
          "0%": {
            left: "5%",
            bottom: "0%",
            width: "8%",
            rotate: "0deg",
          },
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
          "60%": { left: "28%", bottom: "17%", width: "5%", rotate: "420deg" }, // suelo — detiene rotación
          "64%": { left: "28%", bottom: "21%", width: "5%", rotate: "420deg" }, // brincos sin girar
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
      .add("#pokeball", {
        keyframes: {
          "0%": { rotate: "420deg" },
          "20%": { rotate: "430deg" },
          "40%": { rotate: "410deg" },
          "60%": { rotate: "428deg" },
          "80%": { rotate: "414deg" },
          "100%": { rotate: "420deg" },
        },
        duration: 800,
        easing: "easeInOutSine",
      })
      .add("#pokeball", {
        opacity: 0,
        delay: 200,
        duration: 300,
        complete: () => {
          markAsPlayed(animationName);
        },
      });
  }, []);

  return {
    played: Boolean(played),
  };
};
