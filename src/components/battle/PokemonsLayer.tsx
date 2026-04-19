import PokemonDetails from "./PokemonDetails";
import Bulbasaur from "@/assets/pokemons/bulbasaur.gif";
import Ivysaur from "@/assets/pokemons/ivysaur.gif";

const PokemonsLayer = () => {
  return (
    <div>
      <div className="absolute bottom-[18%] left-[24%] w-[23%]">
        <PokemonDetails
          name="Ivysaur"
          health={80}
          currentHealth={60}
          className="mb-6"
        />
        <img
          src={Ivysaur}
          className="object-cover w-full h-auto -scale-x-100"
          alt="Ivysaur"
        />
      </div>

      <div className="absolute bottom-[44%] right-[32%] w-[8%]">
        <PokemonDetails name="Bulbasaur" health={50} currentHealth={25} />
        <img
          src={Bulbasaur}
          className="object-cover w-full h-auto"
          alt="Bulbasaur"
        />
      </div>
    </div>
  );
};

export default PokemonsLayer;
