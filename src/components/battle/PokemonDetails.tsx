import PokemonHealthBar from "./PokemonHealthBar";

const PokemonDetails = ({ name, health, currentHealth, className = "" }) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 items-center justify-center ${className}`}
    >
      <div className="text-white font-press-start text-sm text-center">
        {name}
      </div>
      <PokemonHealthBar health={health} currentHealth={currentHealth} />
      <div className="text-white font-press-start text-sm">
        {currentHealth}/{health}
      </div>
    </div>
  );
};

export default PokemonDetails;
