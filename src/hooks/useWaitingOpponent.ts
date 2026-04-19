import { useSessionStore } from "@/store/useSessionStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useWaitingOpponent = () => {
  const navigate = useNavigate();
  const nickname = useSessionStore((state) => state.nickname);
  const [showReadyButton, setShowReadyButton] = useState(false);
  return {
    nickname,
    showReadyButton,
  };
};
