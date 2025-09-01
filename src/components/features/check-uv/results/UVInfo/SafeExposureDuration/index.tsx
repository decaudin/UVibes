import { skinTypes } from "@/utils/constants/skinTypes";
import { timeConverter } from "@/utils/functions/time/timeConverter";
import { getExposureData } from "@/utils/functions/uv/getExposureData";

interface SafeExposureDurationProps {
    titleForUserSkin: string;
    riskFreeMessage: string;
    titleForAllSkins: string;
    skinTypeLabels: Record<number, string>;
    safeExposureTime: { [key: string]: number | null };
    filteredExposureTime?: number;
}

export default function SafeExposureDuration({ titleForUserSkin, riskFreeMessage, titleForAllSkins, skinTypeLabels, safeExposureTime, filteredExposureTime }: SafeExposureDurationProps) {

    return (
        <>
            {filteredExposureTime !== undefined ? (
                <>
                    <h3 className="my-6">{titleForUserSkin}</h3>
                    <p className="font-bold px-2">
                        {filteredExposureTime === null ? riskFreeMessage : timeConverter(filteredExposureTime)}
                    </p>
                </>
            ) : (
                <>
                    <h3 className="my-6">{titleForAllSkins}</h3>
                    <ul>
                        {skinTypes.map((skinType) => (
                            <li key={skinType.key} className="mt-2 px-2">
                                <strong>{skinTypeLabels[Number(skinType.key)]} :</strong> {getExposureData(safeExposureTime[skinType.key] ?? null )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}