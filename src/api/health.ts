import { httpClient } from "../clients/http";

export const checkServerHealth = async () => {
  const response = await httpClient.get("/api/health/check");
  return response.data;
};
