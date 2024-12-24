import { create } from "zustand";

interface SelectedIndexType {
  selectedIndex: number | null;
  setSelectedIndexState: (selectedIndex: number | null) => void;
}

export const useSelectedIndexState = create<SelectedIndexType>((set) => ({
  selectedIndex: null,
  setSelectedIndexState: (selectedIndex) => set({ selectedIndex }),
}));
