import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useBattleStore } from "@/store/useBattleStore";
import { BattleStatus } from "@/enums/IBattle";
import { useSessionStore } from "@/store/useSessionStore";

export const RequireFinishedStatus = () => {
  const battleStatus = useBattleStore((state) => state.status);

  if (battleStatus !== BattleStatus.Finished) {
    return <Navigate to={ROUTES.BATTLE} replace />;
  }

  return <Outlet />;
};

export const RequireBattleStatus = () => {
  const battleStatus = useBattleStore((state) => state.status);

  if (battleStatus !== BattleStatus.Battling) {
    return <Navigate to={ROUTES.WAITING_OPPONENT} replace />;
  }

  return <Outlet />;
};

export const RequireWaitingStatus = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const winnerId = useBattleStore((state) => state.winnerId);
  const battleStatus = useBattleStore((state) => state.status);

  if (battleStatus === BattleStatus.Battling) {
    return <Navigate to={ROUTES.BATTLE} replace />;
  }

  if (battleStatus === BattleStatus.Finished) {
    if (nickname === winnerId) {
      return <Navigate to={ROUTES.VICTORY} replace />;
    } else {
      return <Navigate to={ROUTES.DEFEAT} replace />;
    }
  }

  return <Outlet />;
};
