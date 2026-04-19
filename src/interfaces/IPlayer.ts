import { IPokemon } from "./IPokemon";

export interface IPlayer {
  nickname: string;
  pokemonTeam: IPokemon[];
  isReady: boolean;
}

export interface IPlayers {
  current: IPlayer | undefined;
  opponent: IPlayer | undefined;
}
