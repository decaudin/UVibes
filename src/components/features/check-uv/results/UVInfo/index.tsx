import type { UvApiResponse } from "@/types/UvApiResponse";
import { JSX } from "react";
import { roundToHundredths } from "@/utils/functions/uv/roundToHundredths";
import SafeExposureDuration from "./SafeExposureDuration";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

interface UVInfoProps {
    labels: {
        title: string;
        currentUvLabel: string;
        maxUvLabel: string;
        ozoneLabel: string;
        ozoneUnit: string;
    };
    uvMessage: string;
    uvImage: JSX.Element;
    uvData: UvApiResponse;
    localTime: string;
    maxUvTime: string;
    exposureTexts: {
        titleForUserSkin: string;
        riskFreeMessage: string;
        titleForAllSkins: string;
    };
    skinTypeLabels: Record<number, string>;
    filteredExposureTime?: number;
}

export default function UVInfo({ labels, uvMessage, uvImage, uvData, localTime, maxUvTime, exposureTexts, skinTypeLabels, filteredExposureTime }: UVInfoProps ) {

    return (
        <StaggeredFadeIn className="flex flex-col items-center my-16">
            <h1 className="text-lg text-center text-yellow-500">{labels.title}</h1>
            <h2 className="my-8 text-center">{uvMessage}</h2>
            <div className="flex justify-center">
                <div className="mt-6 shadow-[0px_6px_8px_3px_rgb(207,207,207)]">
                    {uvImage}
                </div>
            </div>
            <StaggeredFadeIn className="mt-16 p-6 bg-white shadow-md rounded-lg text-center">
                <p className="mt-4 mb-6">{labels.currentUvLabel}<strong>{roundToHundredths(uvData.result.uv)}</strong> ({localTime})</p>
                <p>{labels.maxUvLabel}<strong>{roundToHundredths(uvData.result.uv_max)}</strong> ({maxUvTime})</p>
                <SafeExposureDuration
                    {...exposureTexts}
                    filteredExposureTime={filteredExposureTime} 
                    safeExposureTime={uvData.result.safe_exposure_time}
                    skinTypeLabels={skinTypeLabels}
                />
                <p className="mt-6 mb-4">{labels.ozoneLabel}<strong>{uvData.result.ozone}{labels.ozoneUnit}</strong></p>
            </StaggeredFadeIn>
        </StaggeredFadeIn>
    )
}