import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { BattleStatus } from "@/enums/IBattle";
import { useBattle } from "@/hooks/useBattle";

const AttackLayer = () => {
  const { isPlayerTurn, handleAttack, status } = useBattle();

  if (status === BattleStatus.Finished) return;

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
