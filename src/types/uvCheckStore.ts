import type { City } from "@/types/city";

export type UvCheckState = {
    mode: "coords" | "city";

    latitude?: number;
    longitude?: number;
    altitude?: number;

    city?: string;
    cityLatitude?: number;
    cityLongitude?: number;
    cityQuery?: string;
    citySelected?: City | null;

    skinType?: number | null;
};

export type UvCheckActions = {
    setField: <K extends keyof UvCheckState>(key: K, value: UvCheckState[K]) => void;

    reset: () => void;
};

export type UvCheckStore = UvCheckState & UvCheckActions