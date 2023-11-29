import { create } from "zustand";

type RunMusic = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMusic = create<RunMusic>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
