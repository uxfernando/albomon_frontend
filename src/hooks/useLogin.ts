import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { cleanNickname, isValidNickname, MAX_NICKNAME_LENGTH } from "@/utils/nickname";

export const useLogin = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const setNickname = useSessionStore((state) => state.setNickname);

  const [inputValue, setInputValue] = useState(nickname);
  const [error, setError] = useState<string | null>(null);

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
      setError(`El nombre no es válido (máximo ${MAX_NICKNAME_LENGTH} caracteres).`);
      return;
    }

    setNickname(inputValue);
    // Redirigir a la vista de batalla, asumiendo que ya pasó la validación de IP
    navigate("/start-battle");
  };

  return {
    inputValue,
    error,
    handleChange,
    handleSubmit,
    maxLength: MAX_NICKNAME_LENGTH,
  };
};
