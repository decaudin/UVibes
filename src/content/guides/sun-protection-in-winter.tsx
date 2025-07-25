import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("sunProtectionInWinter");
};

export default async function SunProtectionInWinter() {

    const t = await getI18n();

    return (
        <>
            <GuideTitle>{t("winter.title")}</GuideTitle>

            <SimpleGuideSection title={t("winter.cloudTitle")} content={t("winter.cloudText")} />

            <SimpleGuideSection title={t("winter.snowTitle")} content={t("winter.snowText")} />

            <SimpleGuideSection title={t("winter.whyTitle")} content={t("winter.whyText")} />

            <GuideSection title={t("winter.tipsTitle")}>
                <ul className="list-disc pl-6">
                    <li>{t("winter.tipsList.item1")}</li>
                    <li>{t("winter.tipsList.item2")}</li>
                    <li>{t("winter.tipsList.item3")}</li>
                    <li>{t("winter.tipsList.item4")}</li>
                </ul>
            </GuideSection>
        </>
    )
}