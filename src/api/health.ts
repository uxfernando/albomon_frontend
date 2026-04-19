import { httpClient } from "./client";

export const checkServerHealth = async () => {
  const response = await httpClient.get("/api/health/check");
  return response.data;
};
