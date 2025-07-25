import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("uvLongTermEffects");
};

export default async function UVLongTermEffects() {

    const t = await getI18n();

    return (
        <>
            <GuideTitle>{t("longTerm.title")}</GuideTitle>

            <SimpleGuideSection title={t("longTerm.diffTitle")} content={t("longTerm.diffText")} />

            <GuideSection title={t("longTerm.risksTitle")}>
                <ul className="list-disc pl-6">
                    <li>{t("longTerm.risksList.item1")}</li>
                    <li>{t("longTerm.risksList.item2")}</li>
                    <li>{t("longTerm.risksList.item3")}</li>
                </ul>
            </GuideSection>

            <SimpleGuideSection title={t("longTerm.whyTitle")} content={t("longTerm.whyText")} />
        </>
    )
}