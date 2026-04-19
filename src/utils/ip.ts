/**
 * Limpia una URL ingresada por el usuario para dejar solo el protocolo, IP y el puerto.
 * Remueve rutas adicionales o slashes al final.
 */
export const cleanServerIp = (input: string): string => {
  if (!input) return "";

  // Si tiene un slash al final después del puerto o dominio, quitamos el path
  // Ejemplo: http://192.168.1.1:8080/api -> http://192.168.1.1:8080
  try {
    const url = new URL(input);
    return `${url.protocol}//${url.host}`;
  } catch (e) {
    // Si no es una URL parseable aún (ej. el usuario apenas está escribiendo "http://")
    // regresamos el string limpio de espacios.
    return input.trim();
  }
};

/**
 * Valida si una cadena tiene el formato de una URL válida que incluye http/https y una IP/localhost con o sin puerto.
 * Ejemplos válidos: "http://192.168.1.1", "https://127.0.0.1:8080", "http://localhost:3000"
 */
export const isValidServerIp = (ip: string): boolean => {
  // Regex que exige explícitamente http:// o https:// al inicio,
  // seguido de IPv4 o 'localhost' y opcionalmente un puerto.
  const urlRegex =
    /^https?:\/\/(?:(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost)(?::\d{1,5})?$/;

  return urlRegex.test(ip);
};
