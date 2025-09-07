export type AuthDialogStore = {
    isAuthDialogOpen: boolean;
    view: "account" | "register" | "login";
    setIsAuthDialogOpen: (open: boolean) => void;
    setView: (view: "account" | "register" | "login") => void;
};

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type SidebarStore = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (open: boolean) => void;
};


export type LeadStore = {
  leads: any[],
  setLeads: (leads: any[]) => void;
}