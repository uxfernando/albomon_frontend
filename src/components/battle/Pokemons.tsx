import { usePokemon, usePokemonDamage } from "@/hooks/usePokemon";
import PlayerPokemon from "../layers/pokemons/PlayerPokemon";
import OpponentPokemon from "../layers/pokemons/OpponentPokemon";

const Pokemons = () => {
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();
  const { playerDamage, opponentDamage } = usePokemonDamage();

  return (
    <>
      <PlayerPokemon
        pokemon={currentActivePokemon}
        damageDealt={playerDamage}
      />
      <OpponentPokemon
        pokemon={opponentActivePokemon}
        damageDealt={opponentDamage}
      />
    </>
  );
};

export default Pokemons;
