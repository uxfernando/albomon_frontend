import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnimationState {
  played: Record<string, boolean>;
  hasPlayed: (id: string) => boolean;
  markAsPlayed: (id: string) => void;
}

export const useAnimationStore = create<AnimationState>()(
  persist(
    (set, get) => ({
      played: {},
      hasPlayed: (id) => !!get().played[id],
      markAsPlayed: (id) =>
        set((state) => ({
          played: { ...state.played, [id]: true },
        })),
    }),
    {
      name: "animation-store",
    },
  ),
);
