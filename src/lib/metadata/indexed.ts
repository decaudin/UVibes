import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

type SeoIndexedPageKey = "home" | "about" | "guides" | "safeSunExposure" | "understandingUvIndex" | "chooseSunscreen" | "uvLongTermEffects" | "vitaminDAndSunlight" | "sunProtectionInWinter" | "yearRoundHighUvZones" | "howUvIndexIsCalculated" | "checkUv" | "signIn" | "signUp" | "contact";

function parseOpenGraphType(value: string | undefined): "website" | "article" | undefined {
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