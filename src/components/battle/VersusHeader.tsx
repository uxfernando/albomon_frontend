import { HTMLAttributes } from "react";
import AvailablePokeball from "./AvailablePokeball";

interface VersusHeaderProps extends HTMLAttributes<HTMLDivElement> {
  waiting?: boolean;
}

const VersusHeader: React.FC<VersusHeaderProps> = ({
  waiting = true,
  ...props
}) => {
  return (
    <header
      {...props}
      className="z-10 text-white relative flex justify-between pt-6 px-6"
    >
      <div className="">
        <div className="font-press-start text-sm mb-2">Entrenador 1</div>
        <div className="flex items-center gap-2">
          <AvailablePokeball isDefeated={false} />
          <AvailablePokeball isDefeated={false} />
          <AvailablePokeball isDefeated={false} />
        </div>
      </div>
      <div className="font-press-start text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        VS
      </div>
      <div className="text-right">
        {waiting ? (
          <div className="font-press-start text-sm mb-2">
            Esperando oponente...
          </div>
        ) : (
          <div className="font-press-start text-sm mb-2">Entrenador 2</div>
        )}
        <div className="flex items-center gap-2 justify-end">
          <AvailablePokeball isDefeated={false} />
          <AvailablePokeball isDefeated={false} />
          <AvailablePokeball isDefeated={false} />
        </div>
      </div>
    </header>
  );
};

export default VersusHeader;
