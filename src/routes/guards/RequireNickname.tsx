import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { ROUTES } from "@/constants/routes";

export const RequireNickname = () => {
  const nickname = useSessionStore((state) => state.nickname);

  if (!nickname) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
