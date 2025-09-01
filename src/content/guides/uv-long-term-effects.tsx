import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function UVLongTermEffects() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>👩‍⚕️ {t("longTerm.title")}</GuideTitle>

            <SimpleGuideSection title={`↔️ ${t("longTerm.diffTitle")}`} content={t("longTerm.diffText")} />

            <GuideSection title={`⚠️ ${t("longTerm.risksTitle")}`}>
                <StaggeredFadeIn as="ul">
                    {`🕰️ ${t("longTerm.risksList.item1")}`}
                    {`⚫ ${t("longTerm.risksList.item2")}`}
                    {`⚠️ ${t("longTerm.risksList.item3")}`}
                </StaggeredFadeIn>
            </GuideSection>

            <SimpleGuideSection title={`ℹ️ ${t("longTerm.whyTitle")}`} content={t("longTerm.whyText")} />
        </>
    )
}