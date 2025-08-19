import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export async function generateMetadata() { return generateMetadataForIndexedPage("yearRoundHighUvZones") };

export default async function YearRoundHighUvZones() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>{t("highUv.title")}</GuideTitle>

            <SimpleGuideSection title={t("highUv.nearTitle")} content={t("highUv.nearText")} />

            <SimpleGuideSection title={t("highUv.aussieTitle")} content={t("highUv.aussieText")} />

            <SimpleGuideSection title={t("highUv.mountainTitle")} content={t("highUv.mountainText")} />

            <GuideSection title={t("highUv.tipsTitle")}>
                <ul className="list-disc pl-6">
                    <li>{t("highUv.tipsList.item1")}</li>
                    <li>{t("highUv.tipsList.item2")}</li>
                    <li>{t("highUv.tipsList.item3")}</li>
                </ul>
            </GuideSection>
        </>
    )
}