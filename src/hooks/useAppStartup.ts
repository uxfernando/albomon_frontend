import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { setServerIpToClient } from "@/api/client";
import { checkServerHealth } from "@/api/health";

export const useAppStartup = () => {
  const [isReady, setIsReady] = useState(false);
  const serverIp = useSessionStore((state) => state.serverIp);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    const initializeServices = async () => {
      setIsReady(false);

      try {
        if (serverIp) {
          setServerIpToClient(serverIp);
          console.log(`[Startup] Cliente API configurado con IP: ${serverIp}`);

          await checkServerHealth();
          console.log("[Startup] Handshake exitoso.");
        }

        // - Conectar WebSockets
        // - Cargar configuración inicial del juego
      } catch (error) {
        console.error(
          "[Startup] Error inicializando servicios o falló el handshake:",
          error,
        );
        clearSession();
      } finally {
        setIsReady(true);
      }
    };

    initializeServices();
  }, [serverIp, clearSession]);

  return { isReady };
};
