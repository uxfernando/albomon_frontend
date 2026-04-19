/**
 * Limpia una URL o IP ingresada por el usuario para dejar solo la IP y el puerto.
 * Remueve protocolos (http://, https://) y rutas adicionales.
 */
export const cleanServerIp = (input: string): string => {
  if (!input) return "";

  // Remover protocolo
  let cleaned = input.replace(/^https?:\/\//i, "");

  // Remover cualquier path al final (ej. /api o /)
  cleaned = cleaned.split("/")[0];

  return cleaned;
};

/**
 * Valida si una cadena tiene el formato de una IP válida (IPv4) con o sin puerto.
 * Ejemplos válidos: "192.168.1.1", "127.0.0.1:8080"
 */
export const isValidServerIp = (ip: string): boolean => {
  // Regex para IPv4 con puerto opcional
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::\d{1,5})?$/;
  
  // También podríamos permitir 'localhost' con o sin puerto
  const localhostRegex = /^localhost(?::\d{1,5})?$/;

  return ipRegex.test(ip) || localhostRegex.test(ip);
};
