import PokemonDetails from "@/components/battle/PokemonDetails";
import { IPokemon } from "@/interfaces/IPokemon";
import { getPokemonStyles } from "@/utils/pokemonSize";
import { HTMLAttributes } from "react";

interface PlayerPokemonProps extends HTMLAttributes<HTMLDivElement> {
  pokemon: IPokemon | undefined;
  damageDealt: number | null;
}

const PlayerPokemon = ({ pokemon, damageDealt }: PlayerPokemonProps) => {
  if (!pokemon) {
    return null;
  }

  const playerStyles = getPokemonStyles(pokemon?.id || 0, false);
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        width: playerStyles.width,
        left: playerStyles.left,
        bottom: playerStyles.bottom,
      }}
    >
      {pokemon && (
        <>
          <PokemonDetails
            name={pokemon?.name || ""}
            health={pokemon?.hp || 0}
            currentHealth={pokemon?.currentHp || 0}
            className={`mb-3`}
            size="medium"
          />
          <div
            id="player-pokemon"
            className={`relative w-full flex justify-center`}
          >
            <img
              src={pokemon?.sprite || ""}
              className={`object-cover w-full h-auto ${damageDealt !== null ? "animate-damage-player" : ""}`}
              alt={pokemon?.name || ""}
              style={{
                transform: `scaleX(-1) translateX(${playerStyles.translateX}%) translateY(${playerStyles.translateY}%)`,
              }}
            />
            {damageDealt !== null && (
              <span className=" damage-text absolute top-[20%] text-red-500 font-bold text-4xl z-10 pointer-events-none">
                -{damageDealt}HP
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPokemon;
