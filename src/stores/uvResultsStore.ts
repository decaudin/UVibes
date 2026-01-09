import type { UvApiResponse } from "@/types/UvApiResponse";
import { create } from "zustand";

type UvResultsState = {
    uvData: UvApiResponse | null;
    localTime: string | null;
    timeZone: string | null;
    filteredExposureTime?: number;

    setResults: (data: {
        uvData: UvApiResponse | null;
        localTime: string | null;
        timeZone: string | null;
        filteredExposureTime?: number;
    }) => void;

    reset: () => void;
};

export const useUvResultsStore = create<UvResultsState>(
    (set) => ({
        uvData: null,
        localTime: null,
        timeZone: null,
        filteredExposureTime: undefined,

        setResults: ({ uvData, localTime, timeZone, filteredExposureTime }) => set({ uvData, localTime, timeZone, filteredExposureTime}),

        reset: () => set({ uvData: null, localTime: null, timeZone: null, filteredExposureTime: undefined}),
    })
)