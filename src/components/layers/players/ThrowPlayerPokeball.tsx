import Pokeball from "@/assets/ui/pokeball.png";
import LightningSpell from "@/assets/ui/lightning-spell.gif";
import { HTMLAttributes } from "react";

interface ThrowPlayerPokeballProps extends HTMLAttributes<HTMLDivElement> {
  isPlaying: boolean;
}

const ThrowPlayerPokeball = ({ isPlaying }: ThrowPlayerPokeballProps) => {
  return (
    <>
      <div
        id="player-pokeball"
        className="w-[8%] absolute bottom-0 left-[5%] opacity-0"
      >
        <img
          src={isPlaying ? Pokeball : undefined}
          className="object-cover"
          alt="Pokeball"
        />
      </div>
      <div
        id="player-lightning-spell"
        className="w-[18%] absolute bottom-[13%] left-[21%] opacity-0"
      >
        <img
          src={LightningSpell}
          className="object-cover"
          alt="Lightning Spell"
        />
      </div>
    </>
  );
};

export default ThrowPlayerPokeball;
