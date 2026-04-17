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

export const verifyServerConnection = async (
  ip: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const client = createApiClient(ip);
    const response = await client.get("/api/health");

    if (response.status === 200) {
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    return {
      success: false,
    };
  }
};
