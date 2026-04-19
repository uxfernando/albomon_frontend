import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BackgroundLayout from "@/layouts/BackgrounLayout";

import LoginPage from "@/pages/Login";
import ServerSettingsPage from "@/pages/ServerSettings";
import StartBattlePage from "@/pages/StartBattle";
import WaitingOpponentPage from "@/pages/WaitingOpponent";
import BattlePage from "@/pages/Battle";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<BackgroundLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/server-settings" element={<ServerSettingsPage />} />
          <Route path="/start-battle" element={<StartBattlePage />} />
          <Route path="/waiting-opponent" element={<WaitingOpponentPage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
