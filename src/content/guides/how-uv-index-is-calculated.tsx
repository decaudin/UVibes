import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function HowUvIndexIsCalculated() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>🔬 {t("how.title")}</GuideTitle>

            <SimpleGuideSection title={`📡 ${t("how.measuresTitle")}`} content={t("how.measuresText")} />

            <GuideSection title={`⚙️ ${t("how.parametersTitle")}`} >
                <StaggeredFadeIn as="ul">
                    {`⏰ ${t("how.parametersList.item1")}`}
                    {`☁️ ${t("how.parametersList.item2")}`}
                    {`🌫️ ${t("how.parametersList.item3")}`}
                    {`🏔️ ${t("how.parametersList.item4")}`}
                    {`🧪 ${t("how.parametersList.item5")}`}
                </StaggeredFadeIn>
            </GuideSection>

            <SimpleGuideSection title={`⚖️ ${t("how.marginErrorTitle")}`} content={t("how.marginErrorText")} />

            <SimpleGuideSection title={`📘 ${t("how.understandTitle")}`} content={t("how.understandText")} />
        </>
    )
}