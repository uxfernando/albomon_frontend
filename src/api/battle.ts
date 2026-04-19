import { httpClient } from "../clients/http";

export const attack = async () => {
  const response = await httpClient.get("/api/battle/attack");
  return response.data;
};

export const restartBattle = async () => {
  const response = await httpClient.post("/api/battle/reset");
  return response.data;
};
