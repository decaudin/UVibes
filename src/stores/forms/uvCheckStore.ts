import { create } from "zustand";
import type { UvCheckStore, UvCheckState } from "@/types/uvCheckStore";

const initialState: UvCheckState = {
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,

    cityQuery: undefined,
    citySelected: null,

    skinType: null,
};

export const useUvCheckStore = create<UvCheckStore>((set) => ({
    ...initialState,

    setField: (key, value) =>
        set((state) =>
            state[key] === value ? state : { ...state, [key]: value }
        ),

    reset: () => set(initialState),
}))