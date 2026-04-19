import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BackgroundLayout from "@/layouts/BackgrounLayout";

import LoginPage from "@/pages/Login";
import ServerSettingsPage from "@/pages/ServerSettings";
import StartBattlePage from "@/pages/StartBattle";
import WaitingOpponentPage from "@/pages/WaitingOpponent";
import BattlePage from "@/pages/Battle";
import VictoryPage from "@/pages/Victory";
import DefeatPage from "@/pages/Defeat";

import { RequireServerIp, RequireNickname } from "./guards";
import { ROUTES } from "@/constants/routes";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<BackgroundLayout />}>
          <Route path={ROUTES.SERVER_SETTINGS} element={<ServerSettingsPage />} />

          <Route element={<RequireServerIp />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            <Route element={<RequireNickname />}>
              <Route path={ROUTES.START_BATTLE} element={<StartBattlePage />} />
              <Route
                path={ROUTES.WAITING_OPPONENT}
                element={<WaitingOpponentPage />}
              />
              <Route path={ROUTES.BATTLE} element={<BattlePage />} />
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
