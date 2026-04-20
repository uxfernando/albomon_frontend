import VersusHeader from "@/components/battle/VersusHeader";
import BattleCharactersLayer from "@/components/battle/BattleCharactersLayer";
import PokemonsLayer from "@/components/battle/PokemonsLayer";
import AttackLayer from "@/components/battle/AttackLayer";

const BattlePage = () => {
  return (
    <div className="h-full">
      <VersusHeader />
      <BattleCharactersLayer />
      <PokemonsLayer />
      <AttackLayer isYourTurn={false} />
    </div>
  );
};

export default BattlePage;
