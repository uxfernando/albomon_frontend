import { usePlayerAppear } from "@/animations/PlayerCharacter";
import AshCharacter from "@/assets/characters/ash-character.png";
import BrockCharacter from "@/assets/characters/brock-character.png";
import Pokeball from "@/assets/ui/pokeball.png";

const BattleCharactersLayer = () => {
  const { played } = usePlayerAppear();
  console.log(played);
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
      <div id="pokeball" className="w-[8%] absolute bottom-0 left-[5%]">
        <img src={Pokeball} className="object-cover" alt="Pokeball" />
      </div>
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
