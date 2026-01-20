import type { SeoIndexedPageKey } from "@/types/seoKeys";
import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

const parseOpenGraphType = (value: string | undefined): "website" | "article" | undefined => {
    if (value === "website" || value === "article") return value
    return undefined
}

export const generateMetadataForIndexedPage = async (pageKey: SeoIndexedPageKey) => {

    const t = await getTranslations("seo");

    const url = t(`${pageKey}.url`);

    const path = url.replace(/^https?:\/\/[^/]+/, "");

    const isFr = path === "/fr" || path.startsWith("/fr/");

    const languages = {
        en: isFr ? `https://u-vibes.vercel.app${path.replace(/^\/fr(\/|$)/, "/en$1")}` : url,
        fr: isFr ? url : `https://u-vibes.vercel.app${path.replace(/^\/en(\/|$)/, "/fr$1")}`,
    };

    return createMetadata({
        suffix: t("suffix"),
        title: t(`${pageKey}.title`),
        description: t(`${pageKey}.description`),
        keywords: t(`${pageKey}.keywords`).split(",").map(k => k.trim()),
        type: parseOpenGraphType(t(`${pageKey}.type`)),
        url,
        canonical: url,
        languages,
    })
}