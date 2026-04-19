import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";

export const RequireNickname = () => {
  const nickname = useSessionStore((state) => state.nickname);

  if (!nickname) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
