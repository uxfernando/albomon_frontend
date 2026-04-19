import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const setNickname = useSessionStore((state) => state.setNickname);
  const [name, setName] = useState(nickname || "");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || name === "_") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setNickname(name);
    navigate("/battle-lobby");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;
    newName = newName.replace(/\s+/g, "_").replace(/_+/g, "_");
    setName(newName);
  };

  return {
    name,
    isShaking,
    handleSubmit,
    handleNameChange,
  };
};
