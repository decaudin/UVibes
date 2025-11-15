import type { Point } from "@/lib/schemas/pointSchema";

interface PointsListProps {
    points: Point[];
    t: (key: string) => string;
}

export default function PointsList({ points, t }: PointsListProps) {

    return (
        <div className="flex-1 border p-6 rounded shadow-md max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                    {points.map(point => (
                        <li 
                            key={point.id} 
                            className="p-3 border rounded flex justify-between items-center hover:bg-gray-50 transition"
                        >
                            <span title={`Latitude: ${point.latitude.toFixed(4)}, Longitude: ${point.longitude.toFixed(4)}${point.altitude ? `, Altitude: ${point.altitude.toFixed(1)} m` : ''}`}>
                                📍<span className="ml-4">{point.name}</span>
                            </span>
                            <div className="w-[100px] flex justify-between">
                                <button title={t("uv")} className="hover:bg-gray-200 p-1 rounded transition">👁️</button>
                                <button title={t("update")} className="hover:bg-gray-200 p-1 rounded transition">✏️</button>
                                <button title={t("delete")} className="hover:bg-gray-200 p-1 rounded transition">🗑️</button> {/*TODO: toast avec undo*/}
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    )
}