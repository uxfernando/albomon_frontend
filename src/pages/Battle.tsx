import VersusHeader from "@/components/battle/VersusHeader";

import AshCharacter from "@/assets/ash-character.png";
import BrockCharacter from "@/assets/brock-character.png";

import Bulbasaur from "@/assets/bulbasaur.gif";
import Ivysaur from "@/assets/ivysaur.gif";
import PixelButton from "@/components/ui/PixelButton/PixelButton";

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

const PokemonHealthBar = ({ health = 100, currentHealth = 100 }) => {
  const percentHealth = Math.max(
    0,
    Math.min(100, (currentHealth / health) * 100),
  );

  let barColor = "bg-lime-300";
  let backgroundColor = "bg-lime-100";

  if (percentHealth <= 25) {
    backgroundColor = "bg-red-200";
    barColor = "bg-red-500";
  } else if (percentHealth <= 50) {
    backgroundColor = "bg-amber-100";
    barColor = "bg-amber-300";
  }

  return (
    <div
      className={`w-full max-w-50 h-2 ${backgroundColor} rounded-md overflow-hidden`}
    >
      <div
        className={`h-full ${barColor} rounded-md transition-all duration-300`}
        style={{ width: `${percentHealth}%` }}
      ></div>
    </div>
  );
};

const PokemonDetails = ({ name, health, currentHealth, className = "" }) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 items-center justify-center ${className}`}
    >
      <div className="text-white font-press-start text-sm text-center">
        {name}
      </div>
      <PokemonHealthBar health={health} currentHealth={currentHealth} />
      <div className="text-white font-press-start text-sm">
        {currentHealth}/{health}
      </div>
    </div>
  );
};

const PokemonsLayer = () => {
  return (
    <div>
      <div className="absolute bottom-[18%] left-[24%] w-[23%]">
        <PokemonDetails
          name="Ivysaur"
          health={80}
          currentHealth={60}
          className="mb-6"
        />
        <img
          src={Ivysaur}
          className="object-cover w-full h-auto -scale-x-100"
          alt="Ivysaur"
        />
      </div>

      <div className="absolute bottom-[44%] right-[32%] w-[8%]">
        <PokemonDetails name="Bulbasaur" health={50} currentHealth={25} />
        <img
          src={Bulbasaur}
          className="object-cover w-full h-auto"
          alt="Bulbasaur"
        />
      </div>
    </div>
  );
};

const AttackLayer = ({ isYourTurn = true }) => {
  return (
    <div className="absolute bottom-[10%] right-[10%]">
      {isYourTurn ? (
        <PixelButton className="px-12">Atacar al rival</PixelButton>
      ) : (
        <div className="text-right text-white font-press-start text-sm max-w-88">
          <div>Es turno de tu oponente para atacar...</div>
        </div>
      )}
    </div>
  );
};

const BattlePage = () => {
  return (
    <div className="h-full">
      <VersusHeader waiting={false} />

      {/* Battle Characters Layer */}
      <BattleCharactersLayer />

      {/* Pokemons Layer */}
      <PokemonsLayer />

      {/* Attack Layer */}
      <AttackLayer isYourTurn={false} />
    </div>
  );
};

export default BattlePage;
