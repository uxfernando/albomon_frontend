import { usePlayerAppear } from "@/animations/PlayerCharacter";
import AshCharacter from "@/assets/characters/ash-character.png";
import BrockCharacter from "@/assets/characters/brock-character.png";
import Pokeball from "@/assets/ui/pokeball.png";
import LightningSpell from "@/assets/ui/lightning-spell.gif";

const BattleCharactersLayer = () => {
  const { played, characterAppear, pokeballAppear, lightningSpellAppear } =
    usePlayerAppear();

  return (
    <div>
      <div
        id="player-character"
        className="w-[19%] absolute bottom-0 left-0 z-10"
      >
        <img
          src={AshCharacter}
          className="object-cover"
          alt="Player Character"
        />
      </div>
      {!played && (
        <>
          <div
            id="pokeball"
            className="w-[8%] absolute bottom-0 left-[5%] opacity-0"
          >
            <img src={Pokeball} className="object-cover" alt="Pokeball" />
          </div>
          <div
            id="lightning-spell"
            className="w-[18%] absolute bottom-[13%] left-[21%] opacity-0"
          >
            <img
              src={LightningSpell}
              className="object-cover"
              alt="Lightning Spell"
            />
          </div>
        </>
      )}
      <div className="w-[10%] absolute top-[28%] right-[18%]">
        <img
          src={BrockCharacter}
          className="object-cover"
          alt="Brock Character"
        />
      </div>
    </div>
  );
};

export default BattleCharactersLayer;
