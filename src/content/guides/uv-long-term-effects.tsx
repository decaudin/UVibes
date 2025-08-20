import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export default async function UVLongTermEffects() {

    const t = await getTranslations();

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