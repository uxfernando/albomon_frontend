import { httpClient } from "../clients/http";

export const assignPokemon = async () => {
  const response = await httpClient.get("/api/pokemon/assign");
  return response.data;
};
