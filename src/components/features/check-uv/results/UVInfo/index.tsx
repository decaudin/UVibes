import type { UvApiResponse } from "@/types/UvApiResponse";
import { JSX } from "react";
import { useTranslations } from "next-intl";
import { roundToHundredths } from "@/utils/functions/uv/roundToHundredths";
import SafeExposureDuration from "./SafeExposureDuration";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";


interface UVInfoProps {
    uvMessage: string;
    uvImage: JSX.Element;
    uvData: UvApiResponse;
    localTime: string;
    maxUvTime: string;
    filteredExposureTime?: number;
}

export default function UVInfo({ uvMessage, uvImage, uvData, localTime, maxUvTime, filteredExposureTime }: UVInfoProps ) {

    const t = useTranslations();

    return (
        <StaggeredFadeIn className="flex flex-col items-center my-16">
            <h1 className="text-lg text-center text-yellow-500">{t("uvInfo.title")}</h1>
            <h2 className="my-8 text-center">{uvMessage}</h2>
            <div className="flex justify-center">
                <div className="mt-6 shadow-[0px_6px_8px_3px_rgb(207,207,207)]">
                    {uvImage}
                </div>
            </div>
            <StaggeredFadeIn className="mt-16 p-6 bg-white shadow-md rounded-lg text-center">
                <p className="mt-4 mb-6">{t("uvInfo.currentUvIndex")}<strong>{roundToHundredths(uvData.result.uv)}</strong> ({localTime})</p>
                <p>{t("uvInfo.maxUvIndexOfDay")}<strong>{roundToHundredths(uvData.result.uv_max)}</strong> ({maxUvTime})</p>
                <SafeExposureDuration
                    safeExposureTime={uvData.result.safe_exposure_time}
                    filteredExposureTime={filteredExposureTime}
                />
                <p className="mt-6 mb-4">{t("uvInfo.ozoneLevel")}<strong>{uvData.result.ozone}{t("uvInfo.ozoneUnit")}</strong></p>
            </StaggeredFadeIn>
        </StaggeredFadeIn>
    )
}