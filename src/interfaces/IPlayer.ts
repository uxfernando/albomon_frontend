import { IPokemon } from "./IPokemon";

export interface IPlayer {
  nickname: string;
  pokemonTeam: IPokemon[];
  isReady: boolean;
}
