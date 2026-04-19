import { Outlet } from "react-router-dom";
import ArenaBackground from "@/assets/backgrounds/arena-background.png";

function BackgroundLayout() {
  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden">
      <div className="relative flex max-h-full max-w-412 items-center justify-center">
        <img
          src={ArenaBackground}
          alt="Arena Background"
          className="max-h-dvh max-w-full object-contain"
        />
        <div className="absolute inset-0 z-10 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default BackgroundLayout;
