import AshVictory from "@/assets/ash-victory.png";
import PikachuVictory from "@/assets/pikachu-victory.gif";

function VictoryPage() {
  return (
    <div className="h-full flex flex-col items-center ">
      <div className="text-white max-w-150 text-center flex flex-col justify-center mt-[10%]">
        <div className="mb-6">
          <h1 className="font-press-start text-4xl mb-4">Victoria</h1>
          <p>Te has convertido en un verdadero entrenador Albomon</p>
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
