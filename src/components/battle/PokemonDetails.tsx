import { HTMLAttributes } from "react";
import PokemonHealthBar from "./PokemonHealthBar";
interface PokemonDetailsProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  health: number;
  currentHealth: number;
  className?: string;
  size?: "small" | "medium";
}

const PokemonDetails = ({
  name,
  health,
  currentHealth,
  className = "",
  size = "medium",
  ...props
}: PokemonDetailsProps) => {
  return (
    <div
      className={`w-full flex flex-col gap-1.5 items-center justify-center ${className}`}
      {...props}
    >
      <div
        className={`text-white font-press-start ${size === "small" ? "text-[10px]" : "text-sm"} text-center`}
      >
        {name}
      </div>
      <PokemonHealthBar
        health={health}
        currentHealth={currentHealth}
        size={size}
      />
      <div
        className={`text-white font-press-start ${size === "small" ? "text-[10px]" : "text-sm"} text-center`}
      >
        {currentHealth}/{health}
      </div>
    </div>
  );
};

export default PokemonDetails;
