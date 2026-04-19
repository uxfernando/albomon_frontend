import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { setServerIpToClient } from "@/clients/http";
import { connectSocket } from "@/clients/socket";
import { getBattleDetails } from "@/api/battle";
import { useBattleStore } from "@/store/useBattleStore";

export const useAppStartup = () => {
  const [isReady, setIsReady] = useState(false);
  const serverIp = useSessionStore((state) => state.serverIp);
  const nickname = useSessionStore((state) => state.nickname);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    initializeServices();
  }, [serverIp, clearSession]);

  const initializeServices = async () => {
    setIsReady(false);

    try {
      if (serverIp && nickname) {
        setServerIpToClient(serverIp);

        const { battle } = await getBattleDetails();

        if (battle) {
          useBattleStore.setState(battle);
        }

        connectSocket(serverIp, nickname);
      }
    } catch (error) {
      clearSession();
    } finally {
      setIsReady(true);
    }
  };

  return { isReady, initializeServices };
};
