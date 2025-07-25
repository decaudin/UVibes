import type { Metadata } from "next";
import { getI18n } from "@/locales/server";
import { createMetadata } from "./createMetadata";

type SeoNonIndexedPageKey = "results" | "dashboard" | "notFound";

export async function generateMetadataForNonIndexedPage(pageKey: SeoNonIndexedPageKey): Promise<Metadata> {
    
    const t = await getI18n();

    return createMetadata({
        suffix: t("seo.suffix"),
        title: t(`seo.${pageKey}.title`),
        description: t(`seo.${pageKey}.description`),
        robots: t(`seo.${pageKey}.robots`),
    })
}