import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

type SeoNonIndexedPageKey = "results" | "dashboard" | "notFound";

export async function generateMetadataForNonIndexedPage(pageKey: SeoNonIndexedPageKey) {
    
    const t = await getTranslations("seo");

    return createMetadata({
        suffix: t("suffix"),
        title: t(`${pageKey}.title`),
        description: t(`${pageKey}.description`),
        robots: t(`${pageKey}.robots`),
    })
}