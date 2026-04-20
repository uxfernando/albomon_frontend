import VersusHeader from "@/components/battle/VersusHeader";
import BattleCharactersLayer from "@/components/battle/BattleCharactersLayer";
import PokemonsLayer from "@/components/battle/PokemonsLayer";
import AttackLayer from "@/components/battle/AttackLayer";
import { useBattleEnd } from "@/hooks/useBattle";

const BattlePage = () => {
  useBattleEnd();

  return (
    <div className="h-full">
      {/* <VersusHeader /> */}
      <BattleCharactersLayer />
      <PokemonsLayer />
      {/* <AttackLayer /> */}
    </div>
  );
};

export default BattlePage;
