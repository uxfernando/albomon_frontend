import PokemonDetails from "./PokemonDetails";
import { usePokemon, usePokemonDamage } from "@/hooks/usePokemon";
import { getPokemonStyles } from "@/utils/pokemonSize";

const PokemonsLayer = () => {
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();
  const { playerDamage, opponentDamage } = usePokemonDamage();

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
            <div className="relative w-full flex justify-center">
              <img
                src={currentActivePokemon?.sprite || ""}
                className={`object-cover w-full h-auto ${playerDamage !== null ? "animate-damage-player" : ""}`}
                alt={currentActivePokemon?.name || ""}
                style={{
                  transform: `scaleX(-1) translateX(${playerStyles.translateX}%) translateY(${playerStyles.translateY}%)`,
                }}
              />
              {playerDamage !== null && (
                <span className=" damage-text absolute top-[20%] text-red-500 font-bold text-4xl z-10 pointer-events-none">
                  -{playerDamage}HP
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div
        className="absolute flex flex-col items-center"
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
            <div className="relative w-full flex justify-center">
              <img
                src={opponentActivePokemon?.sprite || ""}
                className={`object-cover w-full h-auto ${opponentDamage !== null ? "animate-damage-opponent" : ""}`}
                alt={opponentActivePokemon?.name || ""}
                style={{
                  transform: `translateX(${opponentStyles.translateX}%) translateY(${opponentStyles.translateY}%)`,
                }}
              />
              {opponentDamage !== null && (
                <span className=" damage-text absolute top-[20%] text-red-500 font-bold text-3xl z-10 pointer-events-none">
                  -{opponentDamage}HP
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonsLayer;
