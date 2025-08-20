import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGUideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export default async function VitaminDAndSunlight() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>{t("vitaminD.title")}</GuideTitle>

            <SimpleGUideSection title={t("vitaminD.whyTitle")} content={t("vitaminD.whyText")} />

            <SimpleGUideSection title={t("vitaminD.howTitle")} content={t("vitaminD.howText")} />

            <GuideSection title={t("vitaminD.quantityTitle")}>
                <ul className="list-disc pl-6">
                    <li><strong>{t("vitaminD.quantityList.label1")}</strong>{t("vitaminD.quantityList.desc1")}</li>
                    <li><strong>{t("vitaminD.quantityList.label2")}</strong>{t("vitaminD.quantityList.desc2")}</li>
                    <li><strong>{t("vitaminD.quantityList.itemStrong3")}</strong>{t("vitaminD.quantityList.itemLast3")}</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600">{t("vitaminD.quantityNote")}</p>
            </GuideSection>

            <SimpleGUideSection title={t("vitaminD.deficiencyTitle")} content={t("vitaminD.deficiencyText")} />

            <GuideSection title={t("vitaminD.balanceTitle")}>
                <p>{t("vitaminD.balanceIntro")}</p>
                <ul className="list-disc pl-6 mt-2">
                    <li>{t("vitaminD.balanceList.item1")}</li>
                    <li>{t("vitaminD.balanceList.item2First")}<strong>{t("vitaminD.balanceList.item2Strong")}</strong>{t("vitaminD.balanceList.item2Last")}</li>
                    <li>{t("vitaminD.balanceList.item3")}</li>
                </ul>
            </GuideSection>
        </>
    )
}