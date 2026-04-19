const PokemonHealthBar = ({ health = 100, currentHealth = 100 }) => {
  const percentHealth = Math.max(
    0,
    Math.min(100, (currentHealth / health) * 100),
  );

  let barColor = "bg-lime-300";
  let backgroundColor = "bg-lime-100";

  if (percentHealth <= 25) {
    backgroundColor = "bg-red-200";
    barColor = "bg-red-500";
  } else if (percentHealth <= 50) {
    backgroundColor = "bg-amber-100";
    barColor = "bg-amber-300";
  }

  return (
    <div
      className={`w-full max-w-50 h-2 ${backgroundColor} rounded-md overflow-hidden`}
    >
      <div
        className={`h-full ${barColor} rounded-md transition-all duration-300`}
        style={{ width: `${percentHealth}%` }}
      ></div>
    </div>
  );
};

export default PokemonHealthBar;
