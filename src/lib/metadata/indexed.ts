import type { Metadata } from "next"
import { getI18n } from "@/locales/server"
import { createMetadata } from "./createMetadata"

type SeoIndexedPageKey = "home" | "about" | "guides" | "safeSunExposure" | "understandingUvIndex" | "chooseSunscreen" | "uvLongTermEffects" | "vitaminDAndSunlight" | "sunProtectionInWinter" | "yearRoundHighUvZones" | "howUvIndexIsCalculated" | "checkUv" | "signIn" | "signUp" | "contact";

function parseOpenGraphType(value: string | undefined): "website" | "article" | undefined {
    if (value === "website" || value === "article") return value
    return undefined
}

export const generateMetadataForIndexedPage = async (pageKey: SeoIndexedPageKey): Promise<Metadata> => {

    const t = await getI18n()

    return createMetadata({
        suffix: t("seo.suffix"),
        title: t(`seo.${pageKey}.title`),
        description: t(`seo.${pageKey}.description`),
        keywords: t(`seo.${pageKey}.keywords`).split(",").map(k => k.trim()),
        type: parseOpenGraphType(t(`seo.${pageKey}.type`)),
        url: t(`seo.${pageKey}.url`),
    })
}