import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { cleanServerIp, isValidServerIp } from "@/utils/ip";
import { setServerIpToClient } from "@/clients/http";
import { checkServerHealth } from "@/api/health";
import { ROUTES } from "@/constants/routes";
import { useAppReset } from "./useAppReset";

export const useServerSettings = () => {
  const navigate = useNavigate();
  const { resetStorage } = useAppReset();
  const serverIp = useSessionStore((state) => state.serverIp);
  const setServerIp = useSessionStore((state) => state.setServerIp);

  const [inputValue, setInputValue] = useState(serverIp);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanedValue = cleanServerIp(rawValue);
    setInputValue(cleanedValue);

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      setError("Necesitas ingresar una URL válida para comenzar el combate.");
      return;
    }

    if (!isValidServerIp(inputValue)) {
      setError(
        "Necesitas incluir http:// o https:// en la IP (ej. http://192.168.1.1:8080).",
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setServerIpToClient(inputValue);
      await checkServerHealth();

      if (serverIp && serverIp !== inputValue) {
        resetStorage();
      }

      setServerIp(inputValue);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError("Verifica la IP y que el servidor esté activo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputValue,
    error,
    handleChange,
    handleSubmit,
    isLoading,
  };
};
