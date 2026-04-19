import PixelButton from "@/components/ui/PixelButton/PixelButton";
import PixelInput from "@/components/ui/PixelInput/PixelInput";
import { useServerSettings } from "@/hooks/useServerSettings";

function ServerSettingsPage() {
  const { inputValue, error, handleChange, handleSubmit, isLoading } =
    useServerSettings();

  return (
    <div className="bg-zinc-950/80 h-full flex justify-center items-center">
      <div className="py-12 px-10 bg-white rounded-md w-120 h-fit flex flex-col items-center text-center">
        <div className="mb-6">
          <h1 className="font-press-start text-sm text-zinc-900 mb-2">
            Configurar tu servidor
          </h1>
          <p className="text-zinc-400">
            Cada batalla es un mundo diferente. Configura tu servidor para
            comenzar el combate.
          </p>
        </div>

        {isLoading ? (
          <div className="h-24 flex justify-center items-center">
            Cargando...
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div>
              <PixelInput
                placeholder="eg: http://198.0.0.100:8080"
                className={`${error ? "border-red-500 animate-shake" : ""}`}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {error && (
                <p className="text-red-500 text-sm mb-1 text-center">{error}</p>
              )}
            </div>
            <PixelButton onClick={handleSubmit}>
              Configurar servidor
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServerSettingsPage;
