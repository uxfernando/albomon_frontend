export const cleanServerIp = (input: string): string => {
  if (!input) return "";

  try {
    const url = new URL(input);
    return `${url.protocol}//${url.host}`;
  } catch (e) {
    return input.trim();
  }
};

export const isValidServerIp = (ip: string): boolean => {
  const urlRegex =
    /^https?:\/\/(?:(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost)(?::\d{1,5})?$/;

  return urlRegex.test(ip);
};
