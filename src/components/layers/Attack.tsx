import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { ANIMATION_NAMES } from "@/constants/animations";
import { BusEvent } from "@/enums/INotifier";
import { useBattle } from "@/hooks/useBattle";
import { useAnimationStore } from "@/store/useAnimationStore";
import { eventBus } from "@/utils/eventBus";
import { useEffect, useState } from "react";

const AttackLayer = () => {
  const { isPlayerTurn, handleAttack } = useBattle();
  const playerThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.PLAYER_THROW_POKEBALL),
  );
  const opponentThrowPokeballPlayed = useAnimationStore((state) =>
    state.hasPlayed(ANIMATION_NAMES.OPPONENT_THROW_POKEBALL),
  );

  const [currentPofemonDefeat, setCurrentPokemonDefeat] = useState(false);
  useEffect(() => {
    const handlePokemonDefeat = (data: { player: string }) => {
      if (data.player === "current") setCurrentPokemonDefeat(true);

      setTimeout(() => {
        setCurrentPokemonDefeat(false);
      }, 6000);
    };

    eventBus.on(BusEvent.POKEMON_DEFEAT, handlePokemonDefeat);

    return () => {
      eventBus.off(BusEvent.POKEMON_DEFEAT, handlePokemonDefeat);
    };
  }, []);

  if (!playerThrowPokeballPlayed || !opponentThrowPokeballPlayed) return;

  return (
    <div className={`absolute bottom-[6%] right-[6%]`}>
      {isPlayerTurn && !currentPofemonDefeat ? (
        <PixelButton className="px-12" onClick={handleAttack}>
          Atacar al rival
        </PixelButton>
      ) : (
        <div className="text-right text-white font-press-start text-xs max-w-88">
          <div>Es turno de tu oponente para atacar...</div>
        </div>
      )}
    </div>
  );
};

export default AttackLayer;
