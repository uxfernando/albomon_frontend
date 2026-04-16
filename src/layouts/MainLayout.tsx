import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main className="p-4 min-h-screen flex items-center justify-center bg-zinc-950">
      {<Outlet />}
    </main>
  );
}

export default MainLayout;
