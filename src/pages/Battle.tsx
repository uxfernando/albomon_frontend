import VersusLayer from "@/components/layers/Versus";
import Players from "@/components/battle/Players";
import Pokemons from "@/components/battle/Pokemons";
import AttackLayer from "@/components/layers/Attack";
import { useBattleEnd } from "@/hooks/useBattle";

const BattlePage = () => {
  useBattleEnd();

  return (
    <div className="h-full">
      <VersusLayer />
      <Players />
      <Pokemons />
      <AttackLayer />
    </div>
  );
};

export default BattlePage;
