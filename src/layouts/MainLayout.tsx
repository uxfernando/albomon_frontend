import { Outlet } from "react-router-dom";
import IPModal, { IPModalRef } from "../components/IPModal/IPModal";
import { useEffect, useRef } from "react";
import { useSessionStore } from "../store/useSessionStore";

function MainLayout() {
  const IPModalRef = useRef<IPModalRef>(null);
  const currentSessionIp = useSessionStore((state) => state.serverIp);

  useEffect(() => {
    if (!currentSessionIp) {
      IPModalRef.current?.open(null);
    }
  }, []);

  const handleIpSubmit = (ip: string) => {
    useSessionStore.setState({ serverIp: ip });
  };

  const handleIpReplacement = () => {
    IPModalRef.current?.open(currentSessionIp);
  };

  return (
    <main className="p-4 min-h-screen flex items-center justify-center bg-zinc-950">
      {<Outlet />}

      {currentSessionIp && (
        <div className="text-zinc-400 absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          Estas en el servidor:{" "}
          <button
            className="underline cursor-pointer text-white"
            onClick={handleIpReplacement}
          >
            {currentSessionIp}
          </button>
        </div>
      )}

      <IPModal ref={IPModalRef} onIpSubmit={handleIpSubmit} />
    </main>
  );
}

export default MainLayout;
