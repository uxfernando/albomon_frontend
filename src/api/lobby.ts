import { httpClient } from "../clients/http";

export const joinLobby = async () => {
  const response = await httpClient.get("/api/lobby/join");
  return response.data;
};

export const setReady = async () => {
  const response = await httpClient.post("/api/lobby/ready");
  return response.data;
};
