import { create } from "zustand";

type ResetPasswordState = {
    email: string;
    setEmail: (email: string) => void;
    reset: () => void;
};

export const useResetPasswordStore = create<ResetPasswordState>(
    (set) => ({
        email: "",
        setEmail: (email) => set({ email }),
        reset: () => set({ email: "" }),
    })
)