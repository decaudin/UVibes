import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function SunProtectionInWinter() {

    const t = await getTranslations();

    return (
        <>   
            <GuideTitle>⛄ {t("winter.title")}</GuideTitle>

            <SimpleGuideSection title={`☁️ ${t("winter.cloudTitle")}`} content={t("winter.cloudText")} />

            <SimpleGuideSection title={`🏔️ ${t("winter.snowTitle")}`} content={t("winter.snowText")} />

            <SimpleGuideSection title={`❓ ${t("winter.whyTitle")}`} content={t("winter.whyText")} />

            <GuideSection title={`💡 ${t("winter.tipsTitle")}`}>
                <StaggeredFadeIn as="ul">
                    {`🧴 ${t("winter.tipsList.item1")}`}
                    {`👒 ${t("winter.tipsList.item2")}`}
                    {`⏰ ${t("winter.tipsList.item3")}`}
                    {`❄️ ${t("winter.tipsList.item4")}`}
                </StaggeredFadeIn>
            </GuideSection>
        </>
    )
}