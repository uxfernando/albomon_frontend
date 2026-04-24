import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { useBattleStore } from "@/store/useBattleStore";
import {
  cleanNickname,
  isValidNickname,
  MAX_NICKNAME_LENGTH,
} from "@/utils/nickname";
import { ROUTES } from "@/constants/routes";
import { joinLobby } from "@/api/lobby";
import { connectSocket } from "@/clients/socket";

export const useLogin = () => {
  const navigate = useNavigate();
  const setNickname = useSessionStore((state) => state.setNickname);
  const setBattle = useBattleStore((state) => state.setBattle);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      const { battle } = await joinLobby(inputValue);

      connectSocket(inputValue);
      setNickname(inputValue);
      setBattle(battle);
      navigate(ROUTES.WAITING_OPPONENT);
    } catch (error: any) {
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
