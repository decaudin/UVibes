import { create } from "zustand";

type ContactState = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setMessage: (message: string) => void;

    reset: () => void;
}

export const useContactStore = create<ContactState>(
    (set) => ({
        firstName: "",
        lastName: "",
        email: "",
        message: "",

        setFirstName: (firstName) => set({ firstName }),
        setLastName: (lastName) => set({ lastName }),
        setEmail: (email) => set({ email }),
        setMessage: (message) => set({ message }),

        reset: () => set({ firstName: "", lastName: "", email: "", message: "" })
    })
)