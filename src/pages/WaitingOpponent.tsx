import VersusHeader from "@/components/battle/VersusHeader";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { ROUTES } from "@/constants/routes";
import { useWaitingOpponent } from "@/hooks/useWaitingOpponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WaitingOpponentPage() {
  const { showReadyButton, players, handleReady, startBattle } =
    useWaitingOpponent();

  const navigate = useNavigate();

  useEffect(() => {
    if (startBattle) {
      navigate(ROUTES.BATTLE);
    }
  }, [startBattle, navigate]);

  return (
    <div className="bg-zinc-950/80 h-full flex flex-col justify-between pb-10">
      <VersusHeader />
      <div className="mx-auto w-full max-w-100">
        {showReadyButton && (
          <PixelButton onClick={handleReady}>Estoy listo</PixelButton>
        )}

        {!showReadyButton && players.opponent && !players.opponent.isReady && (
          <div className="text-white text-center">
            Esperando a que tu rival esté listo...
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitingOpponentPage;
