import { getTranslations } from "next-intl/server";
import GuideTitle from "@/components/ui/guides/GuideTitle";
import SimpleGuideSection from "@/components/ui/guides/SimpleGuideSection";

export default async function ChooseSunscreen() {

    const t = await getTranslations();

    return (
        <>
            <GuideTitle>🧴 {t("choose.title")}</GuideTitle>

            <SimpleGuideSection title={`🔢 ${t("choose.spfTitle")}`} content={t("choose.spfText")} />

            <SimpleGuideSection title={`⚗️ ${t("choose.filterTitle")} 🌿`} content={t("choose.filterText")} />

            <SimpleGuideSection title={`🔄 ${t("choose.reapplyTitle")}`} content={t("choose.reapplyText")} />

            <SimpleGuideSection title={`👶 ${t("choose.kidsTitle")}`} content={t("choose.kidsText")} />
        </>
    )
}