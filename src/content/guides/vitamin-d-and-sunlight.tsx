import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function VitaminDAndSunlight() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>💊 {t("vitaminD.title")}</GuideTitle>

            <SimpleGuideSection title={`💬 ${t("vitaminD.whyTitle")}`} content={t("vitaminD.whyText")} />

            <SimpleGuideSection title={`🧍‍♂️ ${t("vitaminD.howTitle")}`} content={t("vitaminD.howText")} />

            <GuideSection title={`☀️ ${t("vitaminD.quantityTitle")}`}>
                <StaggeredFadeIn as="ul">
                    <span>👩‍🦳 <strong>{t("vitaminD.quantityList.label1")}</strong>{t("vitaminD.quantityList.desc1")}</span>
                    <span>👩🏿 <strong>{t("vitaminD.quantityList.label2")}</strong>{t("vitaminD.quantityList.desc2")}</span>
                    <span>📌 <strong>{t("vitaminD.quantityList.itemStrong3")}</strong>{t("vitaminD.quantityList.itemLast3")}</span>
                </StaggeredFadeIn>
                <p className="mt-2 text-sm text-gray-600">{t("vitaminD.quantityNote")}</p>
            </GuideSection>

            <SimpleGuideSection title={`❗${t("vitaminD.deficiencyTitle")}`} content={t("vitaminD.deficiencyText")} />

            <GuideSection title={`⚖️ ${t("vitaminD.balanceTitle")}`}>
                <p>{t("vitaminD.balanceIntro")}</p>
                <StaggeredFadeIn as="ul">
                    {`🕒 ${t("vitaminD.balanceList.item1")}`}
                    <span>⏱️ {t("vitaminD.balanceList.item2First")}<strong>{t("vitaminD.balanceList.item2Strong")}</strong>{t("vitaminD.balanceList.item2Last")}</span>
                    {`👩‍⚕️ {t("vitaminD.balanceList.item3")}`}
                </StaggeredFadeIn>
            </GuideSection>
        </>
    )
}