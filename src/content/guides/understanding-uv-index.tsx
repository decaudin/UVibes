import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export async function generateMetadata() { return generateMetadataForIndexedPage("understandingUvIndex") };

export default async function UnderstandingUvIndex() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>{t("understand.title")}</GuideTitle>

            <SimpleGuideSection title={t("understand.defTitle")} content={t("understand.defText")} />

            <GuideSection title={t("understand.scaleTitle")}>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>{t("understand.scaleList.label1")}</strong>{t("understand.scaleList.desc1")}</li>
                    <li><strong>{t("understand.scaleList.label2")}</strong>{t("understand.scaleList.desc2")}</li>
                    <li><strong>{t("understand.scaleList.label3")}</strong>{t("understand.scaleList.desc3")}</li>
                    <li><strong>{t("understand.scaleList.label4")}</strong>{t("understand.scaleList.desc4")}</li>
                    <li><strong>{t("understand.scaleList.label5")}</strong>{t("understand.scaleList.desc5")}</li>
                </ul>
            </GuideSection>

            <SimpleGuideSection title={t("understand.whyTitle")} content={t("understand.whyText")} />

            <GuideSection title={t("understand.tipsTitle")}>
                <ul className="list-disc pl-6">
                    <li>{t("understand.tipsList.item1")}</li>
                    <li>{t("understand.tipsList.item2")}</li>
                    <li>{t("understand.tipsList.item3")}</li>
                    <li>{t("understand.tipsList.item4")}</li>
                </ul>
            </GuideSection>
        </>
    )
}