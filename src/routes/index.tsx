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

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<BackgroundLayout />}>
          <Route path="/server-settings" element={<ServerSettingsPage />} />

          <Route element={<RequireServerIp />}>
            <Route path="/" element={<LoginPage />} />

            <Route element={<RequireNickname />}>
              <Route path="/start-battle" element={<StartBattlePage />} />
              <Route
                path="/waiting-opponent"
                element={<WaitingOpponentPage />}
              />
              <Route path="/battle" element={<BattlePage />} />
              <Route path="/victory" element={<VictoryPage />} />
              <Route path="/defeat" element={<DefeatPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
