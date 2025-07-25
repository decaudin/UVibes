import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import GuideTitle from "@/components/ui/Guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/Guides/SimpleGuideSection";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("chooseSunscreen");
};

export default async function ChooseSunscreen() {

    const t = await getI18n();

    return (
        <>
            <GuideTitle>{t("choose.title")}</GuideTitle>

            <SimpleGuideSection title={t("choose.spfTitle")} content={t("choose.spfText")} />

            <SimpleGuideSection title={t("choose.filterTitle")} content={t("choose.filterText")} />

            <SimpleGuideSection title={t("choose.reapplyTitle")} content={t("choose.reapplyText")} />

            <SimpleGuideSection title={t("choose.kidsTitle")} content={t("choose.kidsText")} />
        </>
    )
}