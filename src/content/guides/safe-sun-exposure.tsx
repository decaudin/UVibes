import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";
import GuideSection from "@/components/ui/guides/GuideSection";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

export default async function SafeSunExposure() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>🛡️ {t("safe.title")}</GuideTitle>

            <SimpleGuideSection title={`⚠️ ${t("safe.limitTitle")}`} content={t("safe.limitText")} />

            <GuideSection title={`⚙️ ${t("safe.factorTitle")}`}>
                <StaggeredFadeIn as="ul">
                    <span>🌞 <strong>{t("safe.factorList.label1")}</strong>{t("safe.factorList.desc1")}</span>
                    <span>🧑‍🦰 <strong>{t("safe.factorList.label2")}</strong>{t("safe.factorList.desc2")}</span>
                    <span>🏔️ <strong>{t("safe.factorList.label3")}</strong>{t("safe.factorList.desc3")}</span>
                    <span>⏰ <strong>{t("safe.factorList.label4")}</strong>{t("safe.factorList.desc4")}</span>
                </StaggeredFadeIn>
            </GuideSection>

            <GuideSection title={`⏳ ${t("safe.skinTypeTitle")}`}>
                <p className="mb-2">{t("safe.skinTypeText")}</p>
                <StaggeredFadeIn as="ul">
                    <span>🧑🏻‍🦳 <strong>{t("safe.skinTypeList.label1")}</strong>{t("safe.skinTypeList.desc1")}</span>
                    <span>🧑🏼 <strong>{t("safe.skinTypeList.label2")}</strong>{t("safe.skinTypeList.desc2")}</span>
                    <span>🧑🏽 <strong>{t("safe.skinTypeList.label3")}</strong>{t("safe.skinTypeList.desc3")}</span>
                    <span>🧑🏿 <strong>{t("safe.skinTypeList.label4")}</strong>{t("safe.skinTypeList.desc4")}</span>
                </StaggeredFadeIn>
                <p className="mt-2 text-sm text-gray-600">{t("safe.skinTypeDisclaimer")}</p>
            </GuideSection>

            <GuideSection title={`📌 ${t("safe.adviceTitle")}`}>
                <StaggeredFadeIn as="ul">
                    {`🧴 ${t("safe.adviceList.item1")}`}
                    {`👒 ${t("safe.adviceList.item2")}`}
                    {`🌅 ${t("safe.adviceList.item3")}`}
                    <span>📱 {t("safe.adviceList.item4First")}<strong>{t("safe.adviceList.item4Strong")}</strong>{t("safe.adviceList.item4Last")}</span>
                </StaggeredFadeIn>
            </GuideSection>
        </>
    )
}