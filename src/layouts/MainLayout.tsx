import { Outlet } from "react-router-dom";
import IPModal, { IPModalRef } from "../components/IPModal/IPModal";
import { useEffect, useRef } from "react";

function MainLayout() {
  const IPModalRef = useRef<IPModalRef>(null);

  useEffect(() => {
    IPModalRef.current?.open();
  }, []);

  const handleIpSubmit = (ip: string) => {
    console.log(ip);
  };

  return (
    <main className="p-4 min-h-screen flex items-center justify-center bg-zinc-950">
      {<Outlet />}
      <IPModal ref={IPModalRef} onIpSubmit={handleIpSubmit} />
    </main>
  );
}

export default MainLayout;
