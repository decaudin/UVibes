import { UvApiResponse } from "@/types/UvApiResponse";
import { getUvMessageAndIcon } from "@/utils/functions/uv/getUvMessageAndIcon";
import { roundToHundredths } from "@/utils/functions/uv/roundToHundredths";
import { SafeExposureDuration } from "./SafeExposureDuration";

interface UvInfoProps {
    uvData: UvApiResponse;
    localTime: string;
    maxUvTime: string;
    filteredExposureTime?: number;
}

export function UvInfo({ uvData, localTime, maxUvTime, filteredExposureTime }: UvInfoProps ) {

    const uvLevel = uvData.result.uv;
    const { message, image } = getUvMessageAndIcon(uvLevel);

    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-lg text-yellow-500">UV Radar: Track the Sun’s Power</h1>
            <h2 className="my-8 text-center">{message}</h2>
            <div className="mb-4 shadow-[0px_6px_8px_3px_rgb(207,207,207)]">{image}</div>    
            <p className="mt-4 mb-6">Current UV Index : <strong>{roundToHundredths(uvData.result.uv)}</strong> ({localTime})</p>
            <p className="text-center">Max UV Index of the Day : <strong>{roundToHundredths(uvData.result.uv_max)}</strong> ({maxUvTime})</p>
            <SafeExposureDuration filteredExposureTime={filteredExposureTime} safeExposureTime={uvData.result.safe_exposure_time}/>
            <p className="my-6">Ozone Level : <strong>{uvData.result.ozone} du</strong></p>
        </div>
    );
}