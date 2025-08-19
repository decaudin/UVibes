import type { LocaleParams } from "@/types/localeParams";
import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import { guides } from "@/data/guides";
import GuideCard from "@/components/ui/Guides/GuideCard";

export async function generateMetadata() { return generateMetadataForIndexedPage("guides") }

export default async function Guides({ params }: LocaleParams) {

    const { locale } = await params;

    const t = await getTranslations();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-16">{t("aboutGuidesTitle")}</h1>
            <div className="grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {guides.map(guide => <GuideCard key={guide.slug} locale={locale} {...guide} /> )}
            </div>
        </div>
    )
}