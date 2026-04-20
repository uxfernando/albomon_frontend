import PokemonDetails from "./PokemonDetails";
import { usePokemon } from "@/hooks/usePokemon";

const PokemonsLayer = () => {
  const { currentActivePokemon, opponentActivePokemon } = usePokemon();
  return (
    <div>
      <div className="absolute bottom-[18%] left-[24%] w-[23%]">
        <PokemonDetails
          name={currentActivePokemon?.name || ""}
          health={currentActivePokemon?.hp || 0}
          currentHealth={currentActivePokemon?.currentHp || 0}
          className="mb-6"
          size="medium"
        />
        <img
          src={currentActivePokemon?.sprite}
          className="object-cover w-full h-auto -scale-x-100"
          alt={currentActivePokemon?.name}
        />
      </div>

      <div className="absolute bottom-[44%] right-[32%] w-[8%]">
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
      </div>
    </div>
  );
};

export default PokemonsLayer;
