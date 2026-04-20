import { HTMLAttributes } from "react";
import AvailablePokeball from "./AvailablePokeball";
import { useVersusHeader } from "@/hooks/useVersusHeader";

interface VersusHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const VersusHeader: React.FC<VersusHeaderProps> = ({ ...props }) => {
  const { players, waitingOpponent } = useVersusHeader();

  return (
    <header
      {...props}
      className="z-10 text-white relative flex justify-between pt-6 px-6"
    >
      <div className="">
        <div className="font-press-start text-sm mb-2">
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
      <div className="font-press-start text-4xl absolute left-1/2 -translate-x-1/2">
        VS
      </div>
      <div className="text-right">
        {waitingOpponent ? (
          <div className="font-press-start text-sm mb-2">
            Esperando oponente...
          </div>
        ) : (
          <div className="font-press-start text-sm mb-2">
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

export default VersusHeader;
