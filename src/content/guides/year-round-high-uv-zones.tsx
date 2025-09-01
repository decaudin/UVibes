import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function YearRoundHighUvZones() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>🌍 {t("highUv.title")}</GuideTitle>

            <SimpleGuideSection title={`🌴 ${t("highUv.nearTitle")}`} content={t("highUv.nearText")} />

            <SimpleGuideSection title={`🦘 ${t("highUv.aussieTitle")}`} content={t("highUv.aussieText")} />

            <SimpleGuideSection title={`🏔️ ${t("highUv.mountainTitle")}`} content={t("highUv.mountainText")} />

            <GuideSection title={`✈️ ${t("highUv.tipsTitle")}`}>
                <StaggeredFadeIn as="ul">
                    {`🧐 ${t("highUv.tipsList.item1")}`}
                    {`🔧 ${t("highUv.tipsList.item2")}`}
                    {`📱 ${t("highUv.tipsList.item3")}`}
                </StaggeredFadeIn>
            </GuideSection>
        </>
    )
}