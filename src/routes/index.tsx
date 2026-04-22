import { HashRouter as Router, Routes, Route } from "react-router-dom";

import BackgroundLayout from "@/layouts/BackgrounLayout";

import LoginPage from "@/pages/Login";
import WaitingOpponentPage from "@/pages/WaitingOpponent";
import BattlePage from "@/pages/Battle";
import VictoryPage from "@/pages/Victory";
import DefeatPage from "@/pages/Defeat";

import {
  RequireNickname,
  RequireFinishedStatus,
  RequireBattleStatus,
  RequireWaitingStatus,
} from "./guards";
import { ROUTES } from "@/constants/routes";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<BackgroundLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          <Route element={<RequireNickname />}>
            <Route element={<RequireWaitingStatus />}>
              <Route
                path={ROUTES.WAITING_OPPONENT}
                element={<WaitingOpponentPage />}
              />
            </Route>
            <Route element={<RequireBattleStatus />}>
              <Route path={ROUTES.BATTLE} element={<BattlePage />} />
            </Route>

            <Route element={<RequireFinishedStatus />}>
              <Route path={ROUTES.VICTORY} element={<VictoryPage />} />
              <Route path={ROUTES.DEFEAT} element={<DefeatPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
