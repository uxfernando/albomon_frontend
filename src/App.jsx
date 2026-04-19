import AppRouter from "@/routes";
import { useAppStartup } from "@/hooks/useAppStartup";

function App() {
  const { isReady } = useAppStartup();

  if (!isReady) {
    return (
      <div className="bg-zinc-950 h-screen w-screen flex justify-center items-center text-white font-press-start text-xs">
        Cargando servicios...
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
