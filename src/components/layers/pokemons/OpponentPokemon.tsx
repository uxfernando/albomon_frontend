import PokemonDetails from "@/components/battle/PokemonDetails";
import { IPokemon } from "@/interfaces/IPokemon";
import { getPokemonStyles } from "@/utils/pokemonSize";
import { HTMLAttributes } from "react";

interface OpponentPokemonProps extends HTMLAttributes<HTMLDivElement> {
  pokemon: IPokemon | undefined;
  damageDealt: number | null;
}

const OpponentPokemon = ({ pokemon, damageDealt }: OpponentPokemonProps) => {
  if (!pokemon) {
    return null;
  }

  const opponentStyles = getPokemonStyles(pokemon?.id || 0, true);
  return (
    <div
      id="opponent-pokemon"
      className={`absolute flex flex-col items-center opacity-0`}
      style={{
        width: opponentStyles.width,
        right: opponentStyles.right,
        bottom: opponentStyles.bottom,
      }}
    >
      {pokemon && (
        <>
          <PokemonDetails
            name={pokemon?.name || ""}
            health={pokemon?.hp || 0}
            currentHealth={pokemon?.currentHp || 0}
            className={`mb-2`}
            size="small"
          />
          <div className="relative w-full flex justify-center">
            <img
              src={pokemon?.sprite || ""}
              className={`object-cover w-full h-auto ${damageDealt !== null ? "animate-damage-opponent" : ""}`}
              alt={pokemon?.name || ""}
              style={{
                transform: `translateX(${opponentStyles.translateX}%) translateY(${opponentStyles.translateY}%)`,
              }}
            />
            {damageDealt !== null && (
              <span className=" damage-text absolute top-[20%] text-red-500 font-bold text-lg z-10 pointer-events-none">
                -{damageDealt}HP
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OpponentPokemon;
