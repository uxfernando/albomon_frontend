import { HTMLAttributes } from "react";
import AvailablePokeball from "../battle/AvailablePokeball";
import { useVersusHeader } from "@/hooks/useVersusHeader";

interface VersusLayerProps extends HTMLAttributes<HTMLDivElement> {}

const VersusLayer: React.FC<VersusLayerProps> = ({ ...props }) => {
  const { players, waitingOpponent } = useVersusHeader();

  return (
    <header
      {...props}
      className="z-10 text-white relative flex justify-between pt-[2%] px-[2%]"
    >
      <div>
        <div className="text-xs mb-2 md:text-sm">
          {players.current?.nickname || "Entrenador 1"}
        </div>
        <div className="flex items-center gap-2">
          {players.current?.pokemonTeam.map((pokemon) => (
            <AvailablePokeball
              key={pokemon.name}
              isDefeated={pokemon.currentHp === 0}
            >
              {pokemon.name}
            </AvailablePokeball>
          ))}
        </div>
      </div>
      <div className="text-2xl md:text-4xl absolute left-1/2 -translate-x-1/2">
        VS
      </div>
      <div className="text-right">
        {waitingOpponent ? (
          <div className="text-xs mb-2 md:text-sm">Esperando oponente...</div>
        ) : (
          <div className="text-xs mb-2 md:text-sm">
            {players.opponent?.nickname}
          </div>
        )}
        <div className="flex items-center gap-2 justify-end">
          {players.opponent?.pokemonTeam.map((pokemon) => (
            <AvailablePokeball
              key={pokemon.name}
              isDefeated={pokemon.currentHp === 0}
            >
              {pokemon.name}
            </AvailablePokeball>
          ))}
        </div>
      </div>
    </header>
  );
};

export default VersusLayer;
