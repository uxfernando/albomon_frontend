import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Login from "../pages/Login";
import BattleOver from "../pages/BattleOver";
import BattleLobby from "../pages/BattleLobby";
import WaitingBattle from "../pages/WaitingBattle";
import IPConfigMiddleware from "../pages/middlewares/IPConfig";

//Middlewares

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/battle-over" element={<BattleOver />} />
          <Route path="/battle-lobby" element={<BattleLobby />} />
          <Route path="/waiting-battle" element={<WaitingBattle />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
