import type { UvApiResponse } from "@/types/UvApiResponse";

export type UvResultsStore = {
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
}