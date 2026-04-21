export const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL as string | undefined;

  if (!raw) {
    throw new Error("Falta definir VITE_API_URL en el entorno");
  }

  return raw.replace(/\/+$/, "");
})();

