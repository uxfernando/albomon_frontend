import AlbomonLogo from "@/assets/ui/albomon-logo.png";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import PixelInput from "@/components/ui/PixelInput/PixelInput";

function LoginPage() {
  return (
    <div className="bg-zinc-950/80 h-full flex justify-center items-center">
      <div className="py-12 px-10 bg-white rounded-md w-120 h-fit flex flex-col items-center text-center">
        <img src={AlbomonLogo} alt="Albomon Logo" className="w-full max-w-30" />

        <div className="mt-6 mb-12">
          <h1 className="font-press-start text-sm text-zinc-900 mb-2">
            Prepárate para el combate
          </h1>
          <p className="text-zinc-400">
            Cada entrenador comienza con un nombre… y termina con una historia
            que otros recuerdan.
          </p>
        </div>

        <div className="w-full">
          <PixelInput
            placeholder="Escribe tu nombre de entrenador..."
            className="mb-2"
          />
          <PixelButton>Comenzar aventura</PixelButton>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
