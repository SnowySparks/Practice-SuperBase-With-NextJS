import { create } from "zustand";

interface UsePresenceStoreInterface {
  presence: object;
  setPresence: (newPresence: object) => void;
}

export const usePresenceStore = create<UsePresenceStoreInterface>((set) => ({
  presence: {},
  setPresence: (newPresence) => set({ presence: newPresence }),
}));
