import { timeConverter } from "@/utils/function/timeConverter";

interface SafeExposureDurationProps {
    filteredExposureTime?: number;
    safeExposureTime: { [key: string]: number };
}

export function SafeExposureDuration({ filteredExposureTime, safeExposureTime }: SafeExposureDurationProps) {

    const skinTypes = [
        { key: 'st1', label: 'Very Fair' },
        { key: 'st2', label: 'Fair' },
        { key: 'st3', label: 'Medium' },
        { key: 'st4', label: 'Olive' },
        { key: 'st5', label: 'Brown' },
        { key: 'st6', label: 'Very Dark' },
    ];

    return (

        <div>
            {filteredExposureTime !== undefined ? (
                <>
                    <h3 className="my-6 text-center">Safe Exposure Duration for Your Skin Type:</h3>
                    <p className="text-center font-bold">{timeConverter(filteredExposureTime)}</p>
                </>
            ) : (
                <>
                    <h3 className="my-6 text-center">Safe Exposure Duration for All Skin Types:</h3>
                    <ul>
                        {skinTypes.map((skinType) => (
                            <li key={skinType.key} className="mt-2 text-center">
                                <strong>{skinType.label}:</strong> {timeConverter(safeExposureTime[skinType.key])}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}