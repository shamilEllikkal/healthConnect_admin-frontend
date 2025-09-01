import { create } from "zustand";

type VisibilityState = {
  isVisible: boolean;
  toggleVisibility: () => void;
  show: () => void;
  hide: () => void;
};

const useVisibilityStore = create<VisibilityState>((set) => ({
  isVisible: true,
  toggleVisibility: () =>
    set((state) => ({ isVisible: !state.isVisible })),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));

export default useVisibilityStore;