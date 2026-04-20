import PokemonDetails from "./PokemonDetails";
import { usePokemon } from "@/hooks/usePokemon";
import { getPokemonWidthPercent } from "@/utils/pokemonSize";

const PokemonsLayer = () => {
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();

  const playerWidth = getPokemonWidthPercent(
    currentActivePokemon?.id || 0,
    false,
  );
  const opponentWidth = getPokemonWidthPercent(
    opponentActivePokemon?.id || 0,
    true,
  );

  return (
    <div>
      <div
        className="absolute bottom-[18%] left-[24%] flex flex-col items-center"
        style={{ width: `${playerWidth}%` }}
      >
        {currentActivePokemon && (
          <>
            <PokemonDetails
              name={currentActivePokemon?.name || ""}
              health={currentActivePokemon?.hp || 0}
              currentHealth={currentActivePokemon?.currentHp || 0}
              className="mb-3"
              size="medium"
            />
            <img
              src={currentActivePokemon?.sprite || ""}
              className="object-cover w-full h-auto -scale-x-100"
              alt={currentActivePokemon?.name || ""}
            />
          </>
        )}
      </div>

      <div
        className="absolute bottom-[44%] right-[32%] flex flex-col items-center"
        style={{ width: `${opponentWidth}%` }}
      >
        {opponentActivePokemon && (
          <>
            <PokemonDetails
              name={opponentActivePokemon?.name || ""}
              health={opponentActivePokemon?.hp || 0}
              currentHealth={opponentActivePokemon?.currentHp || 0}
              className="mb-2"
              size="small"
            />
            <img
              src={opponentActivePokemon?.sprite || ""}
              className="object-cover w-full h-auto"
              alt={opponentActivePokemon?.name || ""}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonsLayer;
