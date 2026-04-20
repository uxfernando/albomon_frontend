export interface PokemonStyleConfig {
  width: string;
  left?: string;
  right?: string;
  bottom?: string;
  translateX?: number;
  translateY?: number;
}

interface PokemonConfig {
  width: number;
  playerConfig?: {
    bottom?: string;
    left?: string;
    translateX?: number;
    translateY?: number;
  };
  opponentConfig?: {
    bottom?: string;
    right?: string;
    translateX?: number;
    translateY?: number;
  };
}

const POKEMON_CONFIGS: Record<number, PokemonConfig> = {
  1: { width: 12 }, // Bulbasaur
  2: {
    width: 24,
    playerConfig: {
      left: "21%",
    },
  }, // Ivysaur
  3: {
    width: 24,
    playerConfig: {
      left: "22%",
    },
  }, // Venusaur
  4: {
    width: 12,
    opponentConfig: {
      right: "34%",
    },
  }, // Charmander
  5: {
    width: 24,
    playerConfig: {
      left: "21%",
      translateX: 20,
    },
    opponentConfig: {
      translateX: 20,
    },
  }, // Charmeleon
  6: {
    width: 32,
    playerConfig: {
      left: "18%",
      bottom: "4%",
      translateX: 12,
      translateY: -15,
    },
    opponentConfig: { bottom: "34%", right: "25%", translateY: -15 },
  }, // Charizard
  7: { width: 12 }, // Squirtle
  8: { width: 18 }, // Wartortle
  9: { width: 24, playerConfig: { left: "22%", bottom: "14%" } },
  // Blastoise
  25: {
    width: 12,
    playerConfig: {
      translateX: 18,
    },
    opponentConfig: {
      translateX: 18,
    },
  }, // Pikachu
  26: {
    width: 18,
    playerConfig: {
      left: "23%",
      translateX: -12,
      translateY: -8,
    },
    opponentConfig: {
      translateX: -12,
      translateY: -8,
    },
  }, // Raichu
  39: {
    width: 16,
    playerConfig: {
      translateY: -12,
      bottom: "12%",
    },
    opponentConfig: {
      translateY: -12,
    },
  }, // Jigglypuff
  65: {
    width: 24,
    playerConfig: {
      left: "21%",
    },
  }, // Alakazam
  68: {
    width: 20,
    playerConfig: {
      left: "21%",
    },
  }, // Machamp
  94: {
    width: 22,
    playerConfig: {
      left: "23%",
      bottom: "14%",
    },
  }, // Gengar
  95: {
    width: 24,
    playerConfig: {
      left: "20%",
      bottom: "14%",
    },
  }, // Onix
  143: {
    width: 26,
    playerConfig: {
      left: "20%",
      bottom: "14%",
    },
    opponentConfig: {
      bottom: "36%",
    },
  }, // Snorlax
  149: {
    width: 24,
    playerConfig: {
      left: "20%",
      bottom: "14%",
      translateX: 20,
    },
    opponentConfig: {
      translateX: 20,
    },
  }, // Dragonite
  150: {
    width: 28,
    playerConfig: {
      left: "20%",
      bottom: "14%",
      translateX: 18,
    },
    opponentConfig: {
      translateX: 18,
    },
  }, // Dragonite
  448: { width: 16 }, // Lucario
};

const MIN_WIDTH = 12;
const MAX_WIDTH = 36;

const PERSPECTIVE_RATIO = 0.6;
const DEFAULT_WIDTH = 23;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getPokemonStyles(
  id: number,
  isOpponent: boolean,
): PokemonStyleConfig {
  const config = POKEMON_CONFIGS[id];
  const baseWidth = config?.width ?? DEFAULT_WIDTH;

  const clampedBaseWidth = clamp(baseWidth, MIN_WIDTH, MAX_WIDTH);
  const finalWidth = isOpponent
    ? Math.round(clampedBaseWidth * PERSPECTIVE_RATIO)
    : Math.round(clampedBaseWidth);

  const defaultPlayerBottom = "18%";
  const defaultPlayerLeft = "26%";
  const defaultPlayerTranslateX = 0;
  const defaultPlayerTranslateY = 0;

  const defaultOpponentBottom = "40%";
  const defaultOpponentRight = "30%";
  const defaultOpponentTranslateX = 0;
  const defaultOpponentTranslateY = 0;

  if (isOpponent) {
    return {
      width: `${finalWidth}%`,
      bottom: config?.opponentConfig?.bottom ?? defaultOpponentBottom,
      right: config?.opponentConfig?.right ?? defaultOpponentRight,
      translateX:
        config?.opponentConfig?.translateX ?? defaultOpponentTranslateX,
      translateY:
        config?.opponentConfig?.translateY ?? defaultOpponentTranslateY,
    };
  } else {
    return {
      width: `${finalWidth}%`,
      left: config?.playerConfig?.left ?? defaultPlayerLeft,
      bottom: config?.playerConfig?.bottom ?? defaultPlayerBottom,
      translateX: config?.playerConfig?.translateX ?? defaultPlayerTranslateX,
      translateY: config?.playerConfig?.translateY ?? defaultPlayerTranslateY,
    };
  }
}
