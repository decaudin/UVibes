import type { ArticleTranslationKey } from "@/types/translationKeys";

const slugToTranslationKey: Record<string, ArticleTranslationKey> = {
    "understanding-uv-index": "understand",
    "how-uv-index-is-calculated": "calculate",
    "safe-sun-exposure": "tips",
    "choose-sunscreen": "sunscreen",
    "uv-long-term-effects": "longTerm",
    "vitamin-d-and-sunlight": "vitaminD",
    "sun-protection-in-winter": "winter",
    "year-round-high-uv-zones": "highUvZones",
};

export const getTranslationKeyFromSlug = (slug: string): ArticleTranslationKey | null => { return slugToTranslationKey[slug] ?? null }