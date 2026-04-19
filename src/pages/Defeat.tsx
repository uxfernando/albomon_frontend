import SnorlaxDefeat from "@/assets/pokemons/snorlax-defeat.gif";
import Sleep from "@/assets/pokemons/sleep.gif";

function DefeatPage() {
  return (
    <div className="h-full flex flex-col items-center ">
      <div className=" bg-linear-to-b from-zinc-950/90 via-zinc-950/20  to-zinc-950/90 h-full absolute w-full flex flex-col items-center ">
        <div className="text-white max-w-150 text-center flex flex-col justify-center mt-[10%]">
          <div className="mb-6">
            <h1 className="font-press-start text-4xl mb-4">Derrota</h1>
            <p>
              No todos los enfrentamientos se ganan. Mejor suerte para la
              próxima vez. No te desesperes, puedes volver a intentarlo.
            </p>
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
