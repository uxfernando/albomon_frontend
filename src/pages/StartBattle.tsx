import PixelButton from "@/components/ui/PixelButton/PixelButton";

function StartBattlePage() {
  return (
    <div className="bg-zinc-950/80 h-full flex justify-center items-center">
      <div className="text-white max-w-150 text-center flex flex-col justify-center">
        <div className="mb-6">
          <h1 className="font-press-start text-2xl mb-4">
            La arena te espera...
          </h1>
          <p>
            Cada movimiento cuenta y no hay vuelta atrás. Entra al combate y
            demuestra quién merece la victoria.
          </p>
        </div>
        <div className="mx-auto w-full max-w-100">
          <PixelButton>Empezar batalla</PixelButton>
        </div>
      </div>
    </div>
  );
}

export default StartBattlePage;
