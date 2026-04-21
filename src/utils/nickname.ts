export const MAX_NICKNAME_LENGTH = 15;

export const cleanNickname = (input: string): string => {
  if (!input) return "";

  let cleaned = input.replace(/\s+/g, "_");
  cleaned = cleaned.replace(/_+/g, "_");

  if (cleaned.length > MAX_NICKNAME_LENGTH) {
    cleaned = cleaned.slice(0, MAX_NICKNAME_LENGTH);
  }

  return cleaned;
};

export const isValidNickname = (nickname: string): boolean => {
  return nickname.length > 0 && nickname.length <= MAX_NICKNAME_LENGTH;
};
