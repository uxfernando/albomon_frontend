import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { useAppStartup } from "@/hooks/useAppStartup";
import {
  cleanNickname,
  isValidNickname,
  MAX_NICKNAME_LENGTH,
} from "@/utils/nickname";
import { ROUTES } from "@/constants/routes";
import { joinLobby } from "@/api/lobby";

export const useLogin = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const setNickname = useSessionStore((state) => state.setNickname);
  const { initializeServices } = useAppStartup();

  const [inputValue, setInputValue] = useState(nickname);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nickname) {
      initializeServices();
      navigate(ROUTES.WAITING_OPPONENT);
    }
  }, [nickname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanedValue = cleanNickname(rawValue);
    setInputValue(cleanedValue);

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      setError("Necesitas ingresar un nombre para comenzar.");
      return;
    }

    if (!isValidNickname(inputValue)) {
      setError(
        `El nombre no es válido (máximo ${MAX_NICKNAME_LENGTH} caracteres).`,
      );
      return;
    }

    try {
      await joinLobby(inputValue);
      setNickname(inputValue);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
    }
  };

  return {
    inputValue,
    error,
    handleChange,
    handleSubmit,
    maxLength: MAX_NICKNAME_LENGTH,
  };
};
