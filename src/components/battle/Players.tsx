import PlayerLayer from "../layers/players/PlayerLayer";
import OpponentLayer from "../layers/players/OpponentLayer";
import { usePlayersAppear } from "@/animations/Player";

const Players = () => {
  const { isPlayingPlayer, isPlayingOpponent } = usePlayersAppear();
  return (
    <>
      <PlayerLayer isPlayingPlayer={isPlayingPlayer} />
      <OpponentLayer isPlayingOpponent={isPlayingOpponent} />
    </>
  );
};

export default Players;
