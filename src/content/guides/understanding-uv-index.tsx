import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function UnderstandingUvIndex() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>🧠 {t("understand.title")}</GuideTitle>

            <SimpleGuideSection title={`🔍 ${t("understand.defTitle")}`} content={t("understand.defText")} />

            <GuideSection title={`📈 ${t("understand.scaleTitle")}`}>
                <StaggeredFadeIn as="ul">
                    <span>🌿 <strong>{t("understand.scaleList.label1")}</strong>{t("understand.scaleList.desc1")}</span>
                    <span>🟡 <strong>{t("understand.scaleList.label2")}</strong>{t("understand.scaleList.desc2")}</span>
                    <span>🟠 <strong>{t("understand.scaleList.label3")}</strong>{t("understand.scaleList.desc3")}</span>
                    <span>🔴 <strong>{t("understand.scaleList.label4")}</strong>{t("understand.scaleList.desc4")}</span>
                    <span>☠️ <strong>{t("understand.scaleList.label5")}</strong>{t("understand.scaleList.desc5")}</span>
                </StaggeredFadeIn>
            </GuideSection>

            <SimpleGuideSection title={`🤔 ${t("understand.whyTitle")}`} content={t("understand.whyText")} />

            <GuideSection title={`💡 ${t("understand.tipsTitle")}`}>
                <StaggeredFadeIn as="ul">
                    {`🧴 ${t("understand.tipsList.item1")}`}
                    {`🕶️ ${t("understand.tipsList.item2")}`}
                    {`⛱️ {t("understand.tipsList.item3")}`}
                    {`⚠️ {t("understand.tipsList.item4")}`}
                </StaggeredFadeIn>
            </GuideSection>
        </>
    )
}