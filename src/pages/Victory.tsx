import AshVictory from "@/assets/characters/ash-victory.png";
import PikachuVictory from "@/assets/pokemons/pikachu-victory.gif";
import PixelButton from "@/components/ui/PixelButton/PixelButton";
import { restartBattle } from "@/api/battle";

function VictoryPage() {
  const handlePlayAgain = async () => {
    try {
      await restartBattle();
    } catch (error) {
      console.error("Failed to restart battle:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="text-white max-w-150 text-center flex flex-col justify-center mt-[5%] z-10">
        <div className="mb-6">
          <h1 className="font-press-start text-2xl md:text-4xl md:mb-4 lg:text-6xl">
            Victoria
          </h1>
          <p className="md:text-sm lg:text-lg">
            Te has convertido en un verdadero entrenador Albomon
          </p>
        </div>
        <div className="flex justify-center max-w-sm mx-auto w-full">
          <PixelButton onClick={handlePlayAgain}>Volver a jugar</PixelButton>
        </div>
      </div>
      <div className="w-[13%] absolute bottom-[13%] left-[44%]">
        <img
          src={AshVictory}
          className="object-cover"
          alt="Ash Victory Image"
        />
      </div>
      <div className="w-[12%] absolute bottom-[12%] left-[30%]">
        <img
          src={PikachuVictory}
          className="object-cover"
          alt="Pikachu Victory Image"
        />
      </div>
    </div>
  );
}

export default VictoryPage;
