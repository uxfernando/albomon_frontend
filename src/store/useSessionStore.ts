import { ISession } from "@/interfaces/ISession";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState extends ISession {
  setNickname: (nickname: string) => void;
  setServerIp: (ip: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      nickname: "",
      serverIp: "",

      setNickname: (nickname) => set({ nickname }),
      setServerIp: (serverIp) => set({ serverIp }),
      clearSession: () => set({ nickname: "", serverIp: "" }),
    }),
    {
      name: "session-store",
    },
  ),
);
