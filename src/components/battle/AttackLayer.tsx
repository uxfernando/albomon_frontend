import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { ANIMATION_NAMES } from "@/constants/animations";
import { BattleStatus } from "@/enums/IBattle";
import { useBattle } from "@/hooks/useBattle";
import { useAnimationStore } from "@/store/useAnimationStore";

const AttackLayer = () => {
  const { isPlayerTurn, handleAttack, status } = useBattle();
  const pokemonHealthAppear = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_POKEMON_HEALTH_APPEAR),
  );

  if (status === BattleStatus.Finished) return;

  return (
    <div
      className={`absolute bottom-[5%] right-[5%] ${pokemonHealthAppear ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
    >
      {isPlayerTurn ? (
        <PixelButton className="px-12" onClick={handleAttack}>
          Atacar al rival
        </PixelButton>
      ) : (
        <div className="text-right text-white font-press-start text-sm max-w-88">
          <div>Es turno de tu oponente para atacar...</div>
        </div>
      )}
    </div>
  );
};

export default AttackLayer;
