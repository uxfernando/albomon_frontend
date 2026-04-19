import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";
import { ROUTES } from "@/constants/routes";

export const RequireServerIp = () => {
  const serverIp = useSessionStore((state) => state.serverIp);

  if (!serverIp) {
    return <Navigate to={ROUTES.SERVER_SETTINGS} replace />;
  }

  return <Outlet />;
};
