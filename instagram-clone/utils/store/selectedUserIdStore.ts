import { create } from "zustand";

interface SelectedUserStoreType {
  selectedUserId: string | null;
  setSelectedUserId: (selectedUserId: string | null) => void;
}

interface SelectedIndexStoreType {
  selectedIndex: number | null;
  setSelectedIndex: (newSelectedIndex: number | null) => void;
}

export const useSelectedUserIdState = create<SelectedUserStoreType>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedIndex) => set({ selectedUserId: selectedIndex }),
}));

export const useSelectedIndexStore = create<SelectedIndexStoreType>((set) => ({
  selectedIndex: null,
  setSelectedIndex: (newSelectedIndex) =>
    set({ selectedIndex: newSelectedIndex }),
}));
