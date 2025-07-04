type UvMessageKeys =
    | "uvLevels.extreme"
    | "uvLevels.veryHigh"
    | "uvLevels.high"
    | "uvLevels.moderate"
    | "uvLevels.low";

export const getUvMessageKey = (uvLevel: number): UvMessageKeys => {
    if (uvLevel >= 9) return "uvLevels.extreme";
    if (uvLevel >= 7) return "uvLevels.veryHigh";
    if (uvLevel >= 5) return "uvLevels.high";
    if (uvLevel >= 3) return "uvLevels.moderate";
    return "uvLevels.low";
}