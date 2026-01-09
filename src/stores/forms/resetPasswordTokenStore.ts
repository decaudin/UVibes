import { create } from "zustand";

type ResetPasswordTokenState = {
    password: string;
    confirmPassword: string;

    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;

    reset: () => void;
}

export const useResetPasswordTokenStore = create<ResetPasswordTokenState>(
    (set) => ({
        password: "",
        confirmPassword: "",

        setPassword: (password) => set({ password }),
        setConfirmPassword: (confirmPassword) => set({ confirmPassword }),

        reset: () => set({ password: "", confirmPassword: "" }),
    })
)