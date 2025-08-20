import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export default async function HowUvIndexIsCalculated() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>{t("how.title")}</GuideTitle>

            <SimpleGuideSection title={t("how.measuresTitle")} content={t("how.measuresText")} />

            <GuideSection title={t("how.parametersTitle")}>
                <ul className="list-disc pl-6">
                    <li>{t("how.parametersList.item1")}</li>
                    <li>{t("how.parametersList.item2")}</li>
                    <li>{t("how.parametersList.item3")}</li>
                    <li>{t("how.parametersList.item4")}</li>
                    <li>{t("how.parametersList.item5")}</li>
                </ul>
            </GuideSection>

            <SimpleGuideSection title={t("how.marginErrorTitle")} content={t("how.marginErrorText")} />

            <SimpleGuideSection title={t("how.understandTitle")} content={t("how.understandText")} />
        </>
    )
}