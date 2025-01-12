import { UvApiResponse } from "@/types/UvApiResponse";
import { getUvMessageAndIcon } from "@/utils/function/getUvMessageAndIcon";

interface UvInfoProps {
    uvData: UvApiResponse;
}

export function UvInfo ({ uvData }: UvInfoProps ) {

    const uvLevel = uvData?.result?.uv_max || 0;
    const { message, icon } = getUvMessageAndIcon(uvLevel);

    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-lg mb-8 text-yellow-500">UV Radar: Track the Sun’s Power</h1>
            <h2>{message}</h2>
            <div className="mt-4">{icon}</div>    
            <p className="my-4">Current UV Index: {uvData.result.uv}</p>
            <p>Max UV of the Day: {uvData.result.uv_max}</p>
            <p className="my-4">Ozone Level : {uvData.result.ozone}</p>
            <p>Heure UV : {uvData.result.uv_time}</p>
            <p className="my-4">Time of Peak UV : {uvData.result.uv_max_time}</p>
            <p>Heure Ozone : {uvData.result.ozone_time}</p>
        </div>
    )
}