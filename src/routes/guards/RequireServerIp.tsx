import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "@/store/useSessionStore";

export const RequireServerIp = () => {
  const serverIp = useSessionStore((state) => state.serverIp);

  if (!serverIp) {
    return <Navigate to="/server-settings" replace />;
  }

  return <Outlet />;
};
