import axios from "axios";

export const httpClient = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setServerIpToClient = (ip: string) => {
  httpClient.defaults.baseURL = `http://${ip}`;
};
