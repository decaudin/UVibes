import { useI18n } from "@/locales/client";

export const useSkinTypeLabels = () => {
    
    const t = useI18n();

    return {
        1: t("skinType1"),
        2: t("skinType2"),
        3: t("skinType3"),
        4: t("skinType4"),
        5: t("skinType5"),
        6: t("skinType6"),
    };
}