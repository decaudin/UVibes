import type { Props } from "@/types/pageProps";
import { JSX } from "react";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import { guides } from "@/data/guides";
import GuideCard from "@/components/ui/Guides/GuideCard";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("guides");
};

export default async function Guides({ params }: Props): Promise<JSX.Element> {

    const t = await getI18n();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-16">{t("aboutGuidesTitle")}</h1>
            <div className="grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {guides.map(guide => <GuideCard key={guide.slug} locale={params.locale} {...guide} /> )}
            </div>
        </div>
    )
}