import React, { useState, forwardRef, useImperativeHandle } from "react";
import PixelInput from "../PixelInput/PixelInput";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export interface IPModalRef {
  open: () => void;
  close: () => void;
}

interface IPModalProps {
  onIpSubmit: (ip: string) => void;
  title?: string;
  description?: string;
}

const IPModal = forwardRef<IPModalRef, IPModalProps>(
  (
    {
      onIpSubmit,
      title = "Conéctate a tu mundo de batalla",
      description = "Cada arena es diferente. Ingresa la dirección del servidor y prepárate para el combate.",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ip, setIp] = useState("");
    const [isShaking, setIsShaking] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false);
        setIp("");
      },
    }));

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (ip.trim() === "" || ip === ".") {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return;
      }

      onIpSubmit(ip.trim());
      setIsOpen(false);
      setIp("");
    };

    const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newIp = e.target.value;
      // Permitir números, puntos y un solo dos puntos (:)
      newIp = newIp.replace(/[^0-9.:]/g, "");
      newIp = newIp.replace(/\.+/g, ".");

      // Evitar más de un ':'
      const parts = newIp.split(":");
      if (parts.length > 2) {
        newIp = parts[0] + ":" + parts.slice(1).join("").replace(/:/g, "");
      }

      setIp(newIp);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 backdrop-blur-sm">
        <div
          className="bg-white text-zinc-900 rounded-lg px-6 py-10 w-full max-w-lg flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl text-zinc-950 mb-4">{title}</h2>
          <p className="text-zinc-500 mb-10">{description}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="w-full">
              <PixelInput
                type="text"
                placeholder="Ej: 192.168.1.100"
                value={ip}
                onChange={handleIpChange}
                className={isShaking ? "animate-shake" : ""}
                autoFocus
              />
            </div>
            <PrimaryButton type="submit">Confirmar</PrimaryButton>
          </form>
        </div>
      </div>
    );
  },
);

IPModal.displayName = "IPModal";

export default IPModal;
