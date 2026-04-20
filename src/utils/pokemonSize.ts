const POKEMON_WIDTHS: Record<number, number> = {
  1: 28, // Bulbasaur
  2: 30, // Ivysaur
  3: 22, // Venusaur
  4: 23, // Charmander
  5: 27, // Charmeleon
  6: 32, // Charizard
  7: 20, // Squirtle
  8: 26, // Wartortle
  9: 22, // Blastoise
  25: 14, // Pikachu
  26: 24, // Raichu
  39: 18, // Jigglypuff
  65: 28, // Alakazam
  68: 31, // Machamp
  94: 27, // Gengar
  95: 36, // Onix
  143: 36, // Snorlax
  149: 34, // Dragonite
  150: 30, // Mewtwo
  448: 26, // Lucario
};

const MIN_WIDTH = 14;
const MAX_WIDTH = 36;
const PERSPECTIVE_RATIO = 0.55;
const DEFAULT_WIDTH = 23;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getPokemonWidthPercent(
  id: number,
  isOpponent: boolean,
): number {
  const baseWidth = POKEMON_WIDTHS[id] ?? DEFAULT_WIDTH;
  const width = isOpponent ? baseWidth * PERSPECTIVE_RATIO : baseWidth;
  return clamp(Math.round(width), MIN_WIDTH, MAX_WIDTH);
}
