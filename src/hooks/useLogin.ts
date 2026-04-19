import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import {
  cleanNickname,
  isValidNickname,
  MAX_NICKNAME_LENGTH,
} from "@/utils/nickname";
import { ROUTES } from "@/constants/routes";

export const useLogin = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const setNickname = useSessionStore((state) => state.setNickname);

  const [inputValue, setInputValue] = useState(nickname);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nickname) {
      navigate(ROUTES.WAITING_OPPONENT);
    }
  }, [nickname, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanedValue = cleanNickname(rawValue);
    setInputValue(cleanedValue);

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = () => {
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

    setNickname(inputValue);
    navigate(ROUTES.WAITING_OPPONENT);
  };

  return {
    inputValue,
    error,
    handleChange,
    handleSubmit,
    maxLength: MAX_NICKNAME_LENGTH,
  };
};
