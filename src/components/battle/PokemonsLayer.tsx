import PokemonDetails from "./PokemonDetails";
import { usePokemon } from "@/hooks/usePokemon";
import { getPokemonStyles } from "@/utils/pokemonSize";

const PokemonsLayer = () => {
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();

  const playerStyles = getPokemonStyles(currentActivePokemon?.id || 0, false);
  const opponentStyles = getPokemonStyles(opponentActivePokemon?.id || 0, true);

  return (
    <div>
      <div
        className="absolute flex flex-col items-center"
        style={{
          width: playerStyles.width,
          left: playerStyles.left,
          bottom: playerStyles.bottom,
        }}
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
              className="object-cover w-full h-auto"
              alt={currentActivePokemon?.name || ""}
              style={{
                transform: `scaleX(-1) translateX(${playerStyles.translateX}%) translateY(${playerStyles.translateY}%)`,
              }}
            />
          </>
        )}
      </div>

      <div
        className="absolute  flex flex-col items-center"
        style={{
          width: opponentStyles.width,
          right: opponentStyles.right,
          bottom: opponentStyles.bottom,
        }}
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
              style={{
                transform: `translateX(${opponentStyles.translateX}%) translateY(${opponentStyles.translateY}%)`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonsLayer;
