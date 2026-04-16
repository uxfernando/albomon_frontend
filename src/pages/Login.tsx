import { useState } from "react";
import CharizardBackground from "../assets/charizard-background.jpg";
import AlbomonLogo from "../assets/albomon-logo.png";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import PixelInput from "../components/PixelInput/PixelInput";

function Login() {
  const [name, setName] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || name === "_") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;
    newName = newName.replace(/\s+/g, "_").replace(/_+/g, "_");
    setName(newName);
  };

  return (
    <div className="bg-zinc-900 max-w-5xl flex w-full rounded-xl">
      <div className="w-[40%] relative">
        <img
          src={CharizardBackground}
          alt="logo"
          className="rounded-tl-xl rounded-bl-xl absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-black/60" />
        <img
          src={AlbomonLogo}
          alt="logo"
          className="absolute top-10 left-1/2 -translate-x-1/2 w-36  object-cover"
        />
      </div>
      <div className="w-[60%] text-white px-16 py-20 rounded-bl-xl">
        <div className="text-5xl mb-4 tracking-wider">
          Tu destino como entrenador comienza
        </div>
        <div className="mb-10 text-zinc-400">
          Cada entrenador comienza con un nombre… y termina con una historia que
          otros recuerdan.
        </div>

        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <PixelInput
            placeholder="Escribe tu nombre de entrenador..."
            value={name}
            onChange={handleNameChange}
            className={isShaking ? "animate-shake" : ""}
            autoFocus
          />
          <PrimaryButton type="submit" className="text-sm">
            Comenzar aventura
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default Login;
