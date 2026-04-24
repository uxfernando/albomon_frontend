import VersusLayer from "@/components/layers/Versus";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { useWaitingOpponent } from "@/hooks/useWaitingOpponent";

function WaitingOpponentPage() {
  const { showReadyButton, showWaitingMessage, handleReady } =
    useWaitingOpponent();

  return (
    <div className="bg-zinc-950/80 h-full flex flex-col justify-between pb-10">
      <VersusLayer />
      <div className="mx-auto w-full max-w-100">
        {showReadyButton && (
          <PixelButton onClick={handleReady}>Estoy listo</PixelButton>
        )}

        {showWaitingMessage && (
          <div className="text-white text-center">
            Esperando a que tu rival esté listo...
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitingOpponentPage;
