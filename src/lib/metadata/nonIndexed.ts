import type { SeoNonIndexedPageKey } from "@/types/seoKeys";
import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

export const generateMetadataForNonIndexedPage = async (pageKey: SeoNonIndexedPageKey) => {
    
    const t = await getTranslations("seo");

    return createMetadata({
        suffix: t("suffix"),
        title: t(`${pageKey}.title`),
        description: t(`${pageKey}.description`),
        robots: t(`${pageKey}.robots`),
    })
}