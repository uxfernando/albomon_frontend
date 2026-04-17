import React, { useState, forwardRef, useImperativeHandle } from "react";
import PixelInput from "../PixelInput/PixelInput";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Loader from "../Loader/Loader";
import { verifyServerConnection } from "../../api/client";

export interface IPModalRef {
  open: (ip: string | null) => void;
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
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      open: (ip: string | null) => {
        if (ip) setIp(ip);
        setIsOpen(true);
        setErrorMsg(null);
      },
      close: () => {
        setIp("");
        setErrorMsg(null);
        setIsOpen(false);
      },
    }));

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg(null);

      const ipTrimmed = ip.trim();
      // Expresión regular para validar IPv4 (con puerto opcional)
      const ipRegex =
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;

      if (!ipRegex.test(ipTrimmed)) {
        setIsShaking(true);
        setErrorMsg("Formato de IP inválido.");
        setTimeout(() => setIsShaking(false), 500);
        return;
      }

      // Validar que el puerto sea válido si existe
      if (ipTrimmed.includes(":")) {
        const port = parseInt(ipTrimmed.split(":")[1], 10);
        if (port < 1 || port > 65535) {
          setIsShaking(true);
          setErrorMsg("Puerto inválido.");
          setTimeout(() => setIsShaking(false), 500);
          return;
        }
      }

      setIsVerifying(true);
      const result = await verifyServerConnection(ipTrimmed);

      if (result.success) {
        // Simula la conexión por 3 segundos adicionales si fue exitosa
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsVerifying(false);

        onIpSubmit(ipTrimmed);
        setIsOpen(false);
        setIp("");
      } else {
        setIsVerifying(false);
        setErrorMsg(
          result.error || "La IP no es válida o el servidor no responde.",
        );
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };

    const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMsg(null);

      let newIp = e.target.value;
      // Permitir números, puntos y solo dos puntos (:)
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

          {isVerifying ? (
            <div className="py-8">
              <Loader message="Verificando conexión..." />
            </div>
          ) : (
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
                {errorMsg && (
                  <p className="text-red-500 text-base text-right">
                    {errorMsg}
                  </p>
                )}
              </div>
              <PrimaryButton type="submit">Confirmar</PrimaryButton>
            </form>
          )}
        </div>
      </div>
    );
  },
);

export default IPModal;
