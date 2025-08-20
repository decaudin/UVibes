import type { SeoIndexedPageKey } from "@/types/seoKeys";
import enSeo from "@/locales/en/seo";

const slugToCamelCase = (slug: string): string => { return slug.replace(/-([a-z])/g, (_, char) => char.toUpperCase()) };

export const getSeoKeyFromSlug = (slug: string): SeoIndexedPageKey | null => {
    const key = slugToCamelCase(slug);
    return key in enSeo.seo ? (key as SeoIndexedPageKey) : null;
}