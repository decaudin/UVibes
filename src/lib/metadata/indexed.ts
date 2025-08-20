import type { SeoIndexedPageKey } from "@/types/seoKeys";
import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

const parseOpenGraphType = (value: string | undefined): "website" | "article" | undefined => {
    if (value === "website" || value === "article") return value
    return undefined
}

export const generateMetadataForIndexedPage = async (pageKey: SeoIndexedPageKey) => {

    const t = await getTranslations("seo");

    return createMetadata({
        suffix: t("suffix"),
        title: t(`${pageKey}.title`),
        description: t(`${pageKey}.description`),
        keywords: t(`${pageKey}.keywords`).split(",").map(k => k.trim()),
        type: parseOpenGraphType(t(`${pageKey}.type`)),
        url: t(`${pageKey}.url`),
    })
}