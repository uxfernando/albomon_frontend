import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { useAppReset } from "./useAppReset";
import { checkServerHealth } from "@/api/health";
import { connectSocket } from "@/clients/socket";
import { getBattleDetails } from "@/api/battle";
import { useBattleStore } from "@/store/useBattleStore";

export const useAppStartup = () => {
  const { resetStorage } = useAppReset();
  const [isReady, setIsReady] = useState(false);
  const nickname = useSessionStore((state) => state.nickname);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    setIsReady(false);

    await checkServerHealth();

    try {
      if (nickname) {
        const { battle } = await getBattleDetails();

        if (
          !battle ||
          !battle.players.some((p: any) => p.nickname === nickname)
        ) {
          resetStorage();
          return;
        }

        useBattleStore.setState(battle);
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
