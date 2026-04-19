import PokeballAvailable from "@/assets/ui/pokeball-available.png";
import PokeballDefeated from "@/assets/ui/pokeball-defeated.png";

interface AvailablePokeballProps extends React.HTMLAttributes<HTMLDivElement> {
  isDefeated?: boolean;
}

const AvailablePokeball = ({ isDefeated = false }: AvailablePokeballProps) => {
  return (
    <div className="w-6 h-6 relative">
      {isDefeated && (
        <img
          src={PokeballDefeated}
          alt="Pokeball Defeated"
          className="absolute object-cover"
        />
      )}
      <img
        src={PokeballAvailable}
        alt="Pokeball Available"
        className={`absolute object-cover ${isDefeated ? "opacity-40" : ""}`}
      />
    </div>
  );
};

export default AvailablePokeball;
