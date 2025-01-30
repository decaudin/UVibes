import { useEffect, useState } from "react";
import { UvApiResponse } from "@/types/UvApiResponse";
import { getUvMessageAndIcon } from "@/utils/functions/uv/getUvMessageAndIcon";
import { roundToHundredths } from "@/utils/functions/uv/roundToHundredths";
import { formatTime } from "@/utils/functions/time/formatTime";
import { convertUtcToLocal } from "@/utils/functions/time/convertUtcToLocal";
import { SafeExposureDuration } from "../SafeExposureDuration";

interface UvInfoProps {
    uvData: UvApiResponse;
    filteredExposureTime?: number;
    timeZone: string | null;
    localTime: string | null;
}

export function UvInfo({ uvData, filteredExposureTime, localTime, timeZone }: UvInfoProps ) {

    const [isLoading, setIsLoading] = useState(true);

    const formattedLocalTime = localTime ? formatTime(localTime) : null;
    const formattedMaxUvTime = uvData && timeZone ? formatTime(convertUtcToLocal(uvData.result.uv_max_time, timeZone)) : null;

    useEffect(() => {
        if (formattedLocalTime && formattedMaxUvTime) {
            setIsLoading(false);
        }
    }, [formattedLocalTime, formattedMaxUvTime]);

    const uvLevel = uvData?.result?.uv || 0;
    const { message, image } = getUvMessageAndIcon(uvLevel);

    return isLoading ? (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-bounce text-6xl">
                <span role="img" aria-label="sablier">⏳</span>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-lg text-yellow-500">UV Radar: Track the Sun’s Power</h1>
            <h2 className="my-8 text-center">{message}</h2>
            <div className="mb-4">{image}</div>    
            <p className="mt-4 mb-6">Current UV Index : <strong>{roundToHundredths(uvData.result.uv)}</strong> ({formattedLocalTime})</p>
            <p className="text-center">Max UV Index of the Day : <strong>{roundToHundredths(uvData.result.uv_max)}</strong> ({formattedMaxUvTime})</p>
            <SafeExposureDuration filteredExposureTime={filteredExposureTime} safeExposureTime={uvData.result.safe_exposure_time}/>
            <p className="my-6">Ozone Level : <strong>{uvData.result.ozone} du</strong></p>
        </div>
    );
}