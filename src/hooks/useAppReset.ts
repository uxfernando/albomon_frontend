import { useAnimationStore } from "@/store/useAnimationStore";
import { useBattleStore } from "@/store/useBattleStore";
import { useSessionStore } from "@/store/useSessionStore";

export const useAppReset = () => {
  const resetStorage = () => {
    useSessionStore.getState().clearSession();
    useBattleStore.getState().clearBattle();
    useAnimationStore.getState().clearPlayed();

    useSessionStore.persist.clearStorage();
    useBattleStore.persist.clearStorage();
    useAnimationStore.persist.clearStorage();
  };

  return { resetStorage };
};
