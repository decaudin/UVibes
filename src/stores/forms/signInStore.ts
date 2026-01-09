import { create } from "zustand";

type SignInState = {
    email: string;
    password: string;
    isRememberMe: boolean;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setIsRememberMe: (checked: boolean) => void;

    reset: () => void;
}

export const useSignInStore = create<SignInState>(
    (set) => ({
        email: "",
        password: "",
        isRememberMe: false,

        setEmail: (email) => set({ email }),
        setPassword: (password) => set({ password }),
        setIsRememberMe: (checked) => set({ isRememberMe: checked }),

        reset: () => set({ email: "", password: "", isRememberMe: false})
    })
)