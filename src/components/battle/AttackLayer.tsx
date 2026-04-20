import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { useBattle } from "@/hooks/useBattle";

const AttackLayer = () => {
  const { isPlayerTurn, handleAttack } = useBattle();

  return (
    <div className="absolute bottom-[10%] right-[10%]">
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
