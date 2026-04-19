import PixelButton from "@/components/ui/PixelButton/PixelButton";
import PixelInput from "@/components/ui/PixelInput/PixelInput";

function ServerSettingsPage() {
  return (
    <div className="bg-zinc-950/80 h-full flex justify-center items-center">
      <div className="py-12 px-10 bg-white rounded-md w-120 h-fit flex flex-col items-center text-center">
        <div className="mb-6">
          <h1 className="font-press-start text-sm text-zinc-900 mb-2">
            Configurar tu servidor
          </h1>
          <p className="text-zinc-400">
            Cada batalla es un mundo diferente. Configura tu servidor para
            comenzar la batalla.
          </p>
        </div>

        <div className="w-full">
          <PixelInput placeholder="eg: 198.0.0.100:8080" className="mb-2" />
          <PixelButton>Configurar servidor</PixelButton>
        </div>
      </div>
    </div>
  );
}

export default ServerSettingsPage;
