import { httpClient } from "../clients/http";

export const joinLobby = async (nickname: string) => {
  const response = await httpClient.post("/api/lobby/join", {
    nickname,
  });
  return response.data;
};

export const setReady = async (nickname: string) => {
  const response = await httpClient.post("/api/lobby/ready", {
    nickname,
  });
  return response.data;
};
