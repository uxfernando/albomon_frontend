import React, { useEffect, useState } from "react";
import { eventBus } from "@/utils/eventBus";
import { NotifierEvent } from "@/enums/INotifier";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import PikachuRunning from "@/assets/pokemons/pikachu-running.gif";

const OpponentDisconnect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const handleDisconnect = (opponentName: string) => {
      setNickname(opponentName);
      setIsOpen(true);
    };

    eventBus.on(NotifierEvent.OPPONENT_DISCONNECT, handleDisconnect);

    return () => {
      eventBus.off(NotifierEvent.OPPONENT_DISCONNECT, handleDisconnect);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="py-12 px-10 bg-white rounded-md w-120 h-fit flex flex-col items-center text-center">
        <img
          src={PikachuRunning}
          alt="Pikachu Running"
          className="w-full max-w-30"
        />

        <div className="mt-6 mb-6">
          <h1 className="font-press-start text-sm text-zinc-900 mb-2">
            ¡Tu oponente huyó del enfrentamiento!
          </h1>
          <p className="text-zinc-400">
            El entrenador{" "}
            <span className="font-bold text-red-500">{nickname}</span> se ha
            desconectado de la partida.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <PixelButton onClick={() => setIsOpen(false)}>
            Volver al lobby
          </PixelButton>
        </div>
      </div>
    </div>
  );
};

export default OpponentDisconnect;
