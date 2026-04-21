import AshCharacter from "@/assets/characters/ash-character.png";
import ThrowPlayerPokeball from "./ThrowPlayerPokeball";
import { HTMLAttributes } from "react";

interface PlayerLayerProps extends HTMLAttributes<HTMLDivElement> {
  isPlayingPlayer: boolean;
}

const PlayerLayer = ({ isPlayingPlayer }: PlayerLayerProps) => {
  return (
    <>
      <div className="w-[19%] absolute bottom-0 left-0 z-10">
        <img
          src={AshCharacter}
          className="object-cover"
          alt="Player Character"
        />
      </div>
      <ThrowPlayerPokeball isPlaying={isPlayingPlayer} />
    </>
  );
};

export default PlayerLayer;
