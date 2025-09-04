import { AuthDialogStore } from "@/types/types";
import { create } from "zustand";

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  isAuthDialogOpen: false,
  view: "account",
  setIsAuthDialogOpen: (open) => set({ isAuthDialogOpen: open }),
  setView: (view) => set({ view }),
}));
