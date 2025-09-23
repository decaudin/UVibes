import { useTranslations } from "next-intl";
import { timeConverter } from "@/utils/functions/time/timeConverter";

interface SafeExposureDurationProps {
    safeExposureTime: { [key: string]: number | null };
    filteredExposureTime?: number;
}

export default function SafeExposureDuration({ safeExposureTime, filteredExposureTime }: SafeExposureDurationProps) {

    const t = useTranslations();

    if (filteredExposureTime !== undefined) {
        return (
            <>
                <h3 className="my-6">{t("safeExposureDuration.titleUser")}</h3>
                <p className="font-bold px-2">
                    {filteredExposureTime === null ? t("safeExposureDuration.riskFreeUser") : timeConverter(filteredExposureTime)}
                </p>
            </>
        )
    }

    return (
        <>
            <h3 className="my-6">{t("safeExposureDuration.titleAll")}</h3>
            <ul>
                {[1, 2, 3, 4, 5, 6].map((value) => {
                    const exposure = safeExposureTime[`st${value}`];
                    return (
                        <li key={value} className="mt-2 px-2">
                            <strong>{t(`skinTypes.${value}`)} : </strong>
                            {exposure != null ? timeConverter(exposure) : t("safeExposureDuration.riskFreeAll")}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}