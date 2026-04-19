import VersusHeader from "@/components/battle/VersusHeader";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { useWaitingOpponent } from "@/hooks/useWaitingOpponent";

function WaitingOpponentPage() {
  const { nickname, showReadyButton, players } = useWaitingOpponent();
  console.log(players);
  return (
    <div className="bg-zinc-950/80 h-full flex flex-col justify-between pb-10">
      <VersusHeader nickname={nickname} />
      <div className="mx-auto w-full max-w-100">
        {showReadyButton && <PixelButton>Empezar batalla</PixelButton>}
      </div>
    </div>
  );
}

export default WaitingOpponentPage;
