import AppRouter from "@/routes";
import { useAppStartup } from "@/hooks/useAppStartup";
import { useTabDetection } from "./hooks/useTabDetection";
import TabDetection from "./components/modals/TabDetection";
import Loading from "./components/modals/Loading";

function App() {
  const { isDuplicate } = useTabDetection();
  const { isReady } = useAppStartup();

  if (isDuplicate) {
    return <TabDetection />;
  }

  if (!isReady) {
    return <Loading />;
  }

  return <AppRouter />;
}

export default App;
