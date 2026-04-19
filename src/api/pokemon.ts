import { httpClient } from "../clients/http";

export const assignPokemon = async (nickname: string) => {
  const response = await httpClient.post("/api/pokemon/assign", {
    nickname,
  });
  return response.data;
};
