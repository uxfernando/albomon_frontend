import { ISession } from "@/interfaces/ISession";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState extends ISession {
  setNickname: (nickname: string) => void;
  clearSession: () => void;
}

const defaultSession = {
  nickname: "",
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      ...defaultSession,
      setNickname: (nickname) => set({ nickname }),
      clearSession: () => set({ ...defaultSession }),
    }),
    {
      name: "session-store",
    },
  ),
);
