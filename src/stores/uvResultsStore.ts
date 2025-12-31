import type { UvResultsStore } from "@/types/uvResultsStore";
import { create } from "zustand";

export const useUvResultsStore = create<UvResultsStore>(
    (set) => ({
        uvData: null,
        localTime: null,
        timeZone: null,
        filteredExposureTime: undefined,

        setResults: ({ uvData, localTime, timeZone, filteredExposureTime }) => set({ uvData, localTime, timeZone, filteredExposureTime}),

        reset: () => set({ uvData: null, localTime: null, timeZone: null, filteredExposureTime: undefined}),
    })
)