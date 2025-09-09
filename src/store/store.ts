import { AuthDialogStore, AuthStore, CampaignStore, SidebarStore } from "@/types/types";
import { create } from "zustand";

export const useAuthDialogStore = create<AuthDialogStore>((set) => ({
  isAuthDialogOpen: false,
  view: "account",
  setIsAuthDialogOpen: (open) => set({ isAuthDialogOpen: open }),
  setView: (view) => set({ view }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
}));

export const useCampaignStore = create<CampaignStore>((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open }),

  campaignName: '',
  setCampaignName: (name: string) => set({ campaignName: name }),

  selectedCampaignId: null,
  setSelectedCampaignId: (id: number) => set({ selectedCampaignId: id }),
}));