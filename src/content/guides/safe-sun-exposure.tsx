import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";
import GuideSection from "@/components/ui/Guides/GuideSection";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("safeSunExposure");
};

export default async function SafeSunExposure() {

    const t = await getI18n();

    return (
        <>
            <GuideTitle>{t("safe.title")}</GuideTitle>

            <SimpleGuideSection title={t("safe.limitTitle")} content={t("safe.limitText")} />

            <GuideSection title={t("safe.factorTitle")}>
                <ul className="list-disc pl-6">
                    <li><strong>{t("safe.factorList.label1")}</strong>{t("safe.factorList.desc1")}</li>
                    <li><strong>{t("safe.factorList.label2")}</strong>{t("safe.factorList.desc2")}</li>
                    <li><strong>{t("safe.factorList.label3")}</strong>{t("safe.factorList.desc3")}</li>
                    <li><strong>{t("safe.factorList.label4")}</strong>{t("safe.factorList.desc4")}</li>
                </ul>
            </GuideSection>

            <GuideSection title={t("safe.skinTypeTitle")}>
                <p>{t("safe.skinTypeText")}</p>
                <ul className="list-disc pl-6">
                    <li><strong>{t("safe.skinTypeList.label1")}</strong>{t("safe.skinTypeList.desc1")}</li>
                    <li><strong>{t("safe.skinTypeList.label2")}</strong>{t("safe.skinTypeList.desc2")}</li>
                    <li><strong>{t("safe.skinTypeList.label3")}</strong>{t("safe.skinTypeList.desc3")}</li>
                    <li><strong>{t("safe.skinTypeList.label4")}</strong>{t("safe.skinTypeList.desc4")}</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600">{t("safe.skinTypeDisclaimer")}</p>
            </GuideSection>

            <GuideSection title={t("safe.adviceTitle")}>
                 <ul className="list-disc pl-6">
                    <li>{t("safe.adviceList.item1")}</li>
                    <li>{t("safe.adviceList.item2")}</li>
                    <li>{t("safe.adviceList.item3")}</li>
                    <li>{t("safe.adviceList.item4First")}<strong>{t("safe.adviceList.item4Strong")}</strong>{t("safe.adviceList.item4Last")}</li>
                </ul>
            </GuideSection>
        </>
    )
}