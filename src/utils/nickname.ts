export const MAX_NICKNAME_LENGTH = 15;

/**
 * Limpia el nickname ingresado por el usuario:
 * - Reemplaza uno o múltiples espacios seguidos por un solo guión bajo.
 * - Limita la longitud máxima.
 */
export const cleanNickname = (input: string): string => {
  if (!input) return "";

  // Reemplazar espacios por guiones bajos.
  // \s+ atrapa múltiples espacios y los convierte en un solo guión bajo.
  let cleaned = input.replace(/\s+/g, "_");

  // También podemos evitar múltiples guiones bajos seguidos si el usuario los escribe directamente
  cleaned = cleaned.replace(/_+/g, "_");

  // Limitar longitud máxima
  if (cleaned.length > MAX_NICKNAME_LENGTH) {
    cleaned = cleaned.slice(0, MAX_NICKNAME_LENGTH);
  }

  return cleaned;
};

/**
 * Valida si el nickname cumple con los requisitos mínimos.
 */
export const isValidNickname = (nickname: string): boolean => {
  return nickname.length > 0 && nickname.length <= MAX_NICKNAME_LENGTH;
};
