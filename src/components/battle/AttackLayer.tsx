import PixelButton from "@/components/ui/PixelButton/PixelButton";

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

export default AttackLayer;
