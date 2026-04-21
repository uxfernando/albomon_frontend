import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { connectSocket } from "@/clients/socket";
import { getBattleDetails } from "@/api/battle";
import { useBattleStore } from "@/store/useBattleStore";
import { useAppReset } from "./useAppReset";

export const useAppStartup = () => {
  const { resetStorage } = useAppReset();
  const [isReady, setIsReady] = useState(false);
  const nickname = useSessionStore((state) => state.nickname);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    initializeServices();
  }, [nickname, clearSession]);

  const initializeServices = async () => {
    setIsReady(false);

    try {
      if (nickname) {
        const { battle } = await getBattleDetails();

        if (battle) {
          useBattleStore.setState(battle);
        }

        connectSocket(nickname);
      }
    } catch (error) {
      resetStorage();
    } finally {
      setIsReady(true);
    }
  };

  return { isReady, initializeServices };
};
