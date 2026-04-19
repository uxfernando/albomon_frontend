import axios from "axios";

export const createApiClient = (ip: string) => {
  const baseURL = `http://${ip}`;

  const client = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return client;
};
