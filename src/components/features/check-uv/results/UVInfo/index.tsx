import { JSX } from "react";
import { UvApiResponse } from "@/types/UvApiResponse";
import { roundToHundredths } from "@/utils/functions/uv/roundToHundredths";
import { SafeExposureDuration } from "./SafeExposureDuration";

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

export function UVInfo({ labels, uvMessage, uvImage, uvData, localTime, maxUvTime, exposureTexts, skinTypeLabels, filteredExposureTime }: UVInfoProps ) {

    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-lg text-yellow-500">{labels.title}</h1>
            <h2 className="my-8 text-center">{uvMessage}</h2>
            <div className="mb-4 shadow-[0px_6px_8px_3px_rgb(207,207,207)]">{uvImage}</div>    
            <p className="mt-4 mb-6">{labels.currentUvLabel}<strong>{roundToHundredths(uvData.result.uv)}</strong> ({localTime})</p>
            <p className="text-center">{labels.maxUvLabel}<strong>{roundToHundredths(uvData.result.uv_max)}</strong> ({maxUvTime})</p>
            <SafeExposureDuration
                {...exposureTexts}
                filteredExposureTime={filteredExposureTime} 
                safeExposureTime={uvData.result.safe_exposure_time}
                skinTypeLabels={skinTypeLabels}
            />
            <p className="my-6">{labels.ozoneLabel}<strong>{uvData.result.ozone}{labels.ozoneUnit}</strong></p>
        </div>
    );
}