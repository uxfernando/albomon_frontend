import VersusHeader from "@/components/battle/VersusHeader";
import Players from "@/components/battle/Players";
import Pokemons from "@/components/battle/Pokemons";
import AttackLayer from "@/components/battle/AttackLayer";
import { useBattleEnd } from "@/hooks/useBattle";

const BattlePage = () => {
  useBattleEnd();

  return (
    <div className="h-full">
      <VersusHeader />
      <Players />
      <Pokemons />
      {/* <AttackLayer /> */}
    </div>
  );
};

export default BattlePage;
