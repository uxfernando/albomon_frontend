import SnorlaxDefeat from "@/assets/pokemons/snorlax-defeat.gif";
import Sleep from "@/assets/pokemons/sleep.gif";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { restartBattle } from "@/api/battle";

function DefeatPage() {
  const handlePlayAgain = async () => {
    try {
      await restartBattle();
    } catch (error) {
      console.error("Failed to restart battle:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center ">
      <div className=" bg-linear-to-b from-zinc-950/90 via-zinc-950/20  to-zinc-950/90 h-full absolute w-full flex flex-col items-center z-10">
        <div className="text-white max-w-150 text-center flex flex-col justify-center mt-[5%]">
          <div className="mb-6">
            <h1 className="font-press-start text-2xl md:text-4xl md:mb-4 lg:text-6xl">
              Derrota
            </h1>
            <p className="md:text-sm lg:text-lg">
              No todos los enfrentamientos se ganan. Vuelve a intentarlo.
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto w-full">
            <PixelButton onClick={handlePlayAgain}>Volver a jugar</PixelButton>
          </div>
        </div>
      </div>
      <div className="-z-10">
        <div className="w-[25%] absolute bottom-[13%] left-[18%]">
          <img
            src={SnorlaxDefeat}
            className="object-cover w-full h-auto"
            alt="Snorlax Defeat Image"
          />
        </div>
        <div className="w-[7%] absolute bottom-[37%] left-[40%] rotate-45">
          <img
            src={Sleep}
            className="object-cover w-full h-auto"
            alt="Sleep Image"
          />
        </div>
      </div>
    </div>
  );
}

export default DefeatPage;
