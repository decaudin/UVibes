import type { ArticleTranslationKey } from "@/types/translationKeys";

export function getTranslationKeyFromSlug(slug: string): ArticleTranslationKey | null {
    switch (slug) {
        case "understanding-uv-index":
            return "understand";
        case "how-uv-index-is-calculated":
            return "calculate";
        case "safe-sun-exposure":
            return "tips";
        case "choose-sunscreen":
            return "sunscreen";
        case "uv-long-term-effects":
            return "longTerm";
        case "vitamin-d-and-sunlight":
            return "vitaminD";
        case "sun-protection-in-winter":
            return "winter";
        case "year-round-high-uv-zones":
            return "highUvZones";
        default:
            return null;
    }
}