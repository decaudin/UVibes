import type { Point } from "@/lib/schemas/pointSchema";
import { toDMS } from "@/utils/functions/pointsGPS/toDMS";

interface PointsListProps {
    points: Point[];
    t: (key: string) => string;
}

export default function PointsList({ points, t }: PointsListProps) {

    return (
        <div className="flex-1 border p-6 rounded shadow-md max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                    {points.map(({ id, name, latitude, longitude, altitude }) => {
                        const coords = toDMS(latitude, longitude);
                        const title = `Latitude: ${coords.lat}, Longitude: ${coords.lng}${altitude ? `, Altitude: ${Math.round(altitude)} m` : ''}`;

                        return (
                            <li  key={id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50 transition">
                                <span title={title}>
                                    📍<span className="ml-4">{name}</span>
                                </span>
                                <div className="w-[100px] flex justify-between">
                                    <button title={t("uv")} className="hover:bg-gray-200 p-1 rounded transition">👁️</button>
                                    <button title={t("update")} className="hover:bg-gray-200 p-1 rounded transition">✏️</button>
                                    <button title={t("delete")} className="hover:bg-gray-200 p-1 rounded transition">🗑️</button> {/*TODO: toast avec undo*/}
                                </div>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}