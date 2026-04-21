import LightningSpell from "@/assets/ui/lightning-spell.gif";
import { HTMLAttributes } from "react";

interface ThrowOpponentPokeballProps extends HTMLAttributes<HTMLDivElement> {
  isPlaying: boolean;
}

const ThrowOpponentPokeball = ({ isPlaying }: ThrowOpponentPokeballProps) => {
  return (
    <>
      <div
        id="opponent-lightning-spell"
        className="w-[12%] absolute bottom-[40%] right-[31%] opacity-0"
      >
        <img
          src={isPlaying ? LightningSpell : undefined}
          className="object-cover"
          alt="Lightning Spell"
        />
      </div>
    </>
  );
};

export default ThrowOpponentPokeball;
