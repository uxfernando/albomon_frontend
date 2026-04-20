import { httpClient } from "../clients/http";

export const attack = async (nickname: string) => {
  const response = await httpClient.post("/api/battle/attack", { nickname });
  return response.data;
};

export const restartBattle = async () => {
  const response = await httpClient.post("/api/battle/reset");
  return response.data;
};

export const getBattleDetails = async () => {
  const response = await httpClient.get("/api/battle");
  return response.data;
};
