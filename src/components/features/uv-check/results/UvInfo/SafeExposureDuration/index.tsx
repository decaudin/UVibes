import { skinTypes } from "@/utils/constants/skinTypes";
import { timeConverter } from "@/utils/functions/time/timeConverter";
import { getExposureData } from "@/utils/functions/uv/getExposureData";

interface SafeExposureDurationProps {
    filteredExposureTime?: number;
    safeExposureTime: { [key: string]: number | null };
}

export function SafeExposureDuration({ filteredExposureTime, safeExposureTime }: SafeExposureDurationProps) {

    return (
        <>
            {filteredExposureTime !== undefined ? (
                <>
                    <h3 className="my-6 text-center">Safe Exposure Duration for Your Skin Type:</h3>
                    <p className="text-center font-bold px-2">
                        {filteredExposureTime === null ? 'Risk-free Exposure: No time limit - your skin’s good to go!' : timeConverter(filteredExposureTime)}
                    </p>
                </>
            ) : (
                <>
                    <h3 className="my-6 text-center">Safe Exposure Duration for All Skin Types:</h3>
                    <ul>
                        {skinTypes.map((skinType) => (
                            <li key={skinType.key} className="mt-2 px-2 text-center">
                                <strong>{skinType.label} :</strong> {getExposureData(safeExposureTime[skinType.key] ?? null )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}