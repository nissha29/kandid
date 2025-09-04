export type AuthDialogStore = {
    isAuthDialogOpen: boolean;
    view: "account" | "register" | "login";
    setIsAuthDialogOpen: (open: boolean) => void;
    setView: (view: "account" | "register" | "login") => void;
};