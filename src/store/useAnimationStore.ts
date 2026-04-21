import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnimationState {
  played: Record<string, boolean>;
  hasPlayed: (id: string) => boolean;
  markAsPlayed: (id: string) => void;
  clearPlayed: () => void;
}

const defaultAnimation = {
  played: {},
};

export const useAnimationStore = create<AnimationState>()(
  persist(
    (set, get) => ({
      ...defaultAnimation,
      hasPlayed: (id) => !!get().played[id],
      markAsPlayed: (id) =>
        set((state) => ({
          played: { ...state.played, [id]: true },
        })),
      clearPlayed: () => set({ ...defaultAnimation }),
    }),
    {
      name: "animation-store",
    },
  ),
);
