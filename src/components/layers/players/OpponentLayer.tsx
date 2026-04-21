import BrockCharacter from "@/assets/characters/brock-character.png";
import ThrowOpponentPokeball from "./ThrowOpponentPokeball";
import { HTMLAttributes } from "react";

interface OpponentLayerProps extends HTMLAttributes<HTMLDivElement> {
  isPlayingOpponent: boolean;
}

const OpponentLayer = ({ isPlayingOpponent }: OpponentLayerProps) => {
  return (
    <>
      <div className="w-[10%] absolute top-[28%] right-[18%] z-10">
        <img
          src={BrockCharacter}
          className="object-cover"
          alt="Brock Character"
        />
      </div>
      <ThrowOpponentPokeball isPlaying={isPlayingOpponent} />
    </>
  );
};

export default OpponentLayer;
