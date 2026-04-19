import AshCharacter from "@/assets/characters/ash-character.png";
import BrockCharacter from "@/assets/characters/brock-character.png";

const BattleCharactersLayer = () => {
  return (
    <div>
      <div className="w-[19%] absolute bottom-0 left-0">
        <img src={AshCharacter} className="object-cover" alt="Ash Character" />
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
