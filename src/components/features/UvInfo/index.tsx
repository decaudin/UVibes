import { UvApiResponse } from "@/types/UvApiResponse";
import { getUvMessageAndIcon } from "@/utils/function/getUvMessageAndIcon";
import { SafeExposureDuration } from "../SafeExposureDuration";
import { roundToHundredths } from "@/utils/function/roundToHundredths";
import { formatTime } from "@/utils/function/formatTime";

interface UvInfoProps {
    uvData: UvApiResponse;
    filteredExposureTime?: number;
}

export function UvInfo({ uvData, filteredExposureTime }: UvInfoProps ) {

    const uvLevel = uvData?.result?.uv || 0;
    const { message, image } = getUvMessageAndIcon(uvLevel);

    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-lg text-yellow-500">UV Radar: Track the Sun’s Power</h1>
            <h2 className="my-8 text-center">{message}</h2>
            <div className="mb-4">{image}</div>    
            <p className="mt-4 mb-6">Current UV Index : {roundToHundredths(uvData.result.uv)} ({formatTime(uvData.result.uv_time)})</p>
            <p>Max UV of the Day : {roundToHundredths(uvData.result.uv_max)} ({formatTime(uvData.result.uv_max_time)})</p>
            <SafeExposureDuration filteredExposureTime={filteredExposureTime} safeExposureTime={uvData.result.safe_exposure_time}/>
            <p className="my-6">Ozone Level : {uvData.result.ozone} du</p>
        </div>
    )
}