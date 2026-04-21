import PlayerLayer from "../layers/players/PlayerLayer";
import OpponentLayer from "../layers/players/OpponentLayer";
import { usePlayersAnimation } from "@/animations/Player";

const Players = () => {
  const { isPlayingPlayer, isPlayingOpponent } = usePlayersAnimation();
  return (
    <>
      <PlayerLayer isPlayingPlayer={isPlayingPlayer} />
      <OpponentLayer isPlayingOpponent={isPlayingOpponent} />
    </>
  );
};

export default Players;
