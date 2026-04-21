import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { ANIMATION_NAMES } from "@/constants/animations";
import { BattleStatus } from "@/enums/IBattle";
import { useBattle } from "@/hooks/useBattle";
import { useAnimationStore } from "@/store/useAnimationStore";

const AttackLayer = () => {
  const playerThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_THROW_POKEBALL),
  );
  const opponentThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.OPPONENT_THROW_POKEBALL),
  );

  const { isPlayerTurn, handleAttack, status } = useBattle();

  if (status === BattleStatus.Finished) return;
  if (!playerThrowPokeballPlayed || !opponentThrowPokeballPlayed) return;

  return (
    <div className={`absolute bottom-[5%] right-[5%]`}>
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
