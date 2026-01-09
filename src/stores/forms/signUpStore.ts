import { create } from "zustand";

type SignUpState = {
    name: string;
    email: string;
    password: string;

    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;

    reset: () => void;
}

export const useSignUpStore = create<SignUpState>(
    (set) => ({
        name: "",
        email: "",
        password: "",

        setName : (name) => set({ name }),
        setEmail: (email) => set({ email }),
        setPassword: (password) => set({ password }),

        reset: () => set({ name: "", email: "", password: "" })
    })
)