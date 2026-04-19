import { useState } from "react";
import { ConnectionService } from "@/services/ConnectionService";

export const useIPModal = (onIpSubmit: (ip: string) => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ip, setIp] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const open = (initialIp: string | null) => {
    if (initialIp) setIp(initialIp);
    setIsOpen(true);
    setErrorMsg(null);
  };

  const close = () => {
    setIp("");
    setErrorMsg(null);
    setIsOpen(false);
  };

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);

    let newIp = e.target.value;
    newIp = newIp.replace(/[^0-9.:]/g, "");
    newIp = newIp.replace(/\.+/g, ".");

    const parts = newIp.split(":");
    if (parts.length > 2) {
      newIp = parts[0] + ":" + parts.slice(1).join("").replace(/:/g, "");
    }

    setIp(newIp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const ipTrimmed = ip.trim();
    const ipRegex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;

    if (!ipRegex.test(ipTrimmed)) {
      setIsShaking(true);
      setErrorMsg("Formato de IP inválido.");
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

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
    const result = await ConnectionService.verifyServerConnection(ipTrimmed);

    if (result.success) {
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

  return {
    isOpen,
    ip,
    isShaking,
    isVerifying,
    errorMsg,
    open,
    close,
    handleIpChange,
    handleSubmit,
  };
};
