import type { Point } from '@/types/point';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { defaultIcon } from "@/utils/constants/leaflet";
import FitBounds from "./FitBounds";

interface PointsMapProps {
    points: Point[];
}

export default function PointsMap({ points }: PointsMapProps) {

    return (
        <div className="flex-1 border p-6 rounded shadow-md h-96 md:h-auto">
            <MapContainer scrollWheelZoom={false} className="w-full h-96 md:h-[500px] rounded">
                <LayersControl position="topright">
                   <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                            detectRetina={true}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                            detectRetina={true}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {points.map(point => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={defaultIcon}>
                        <Popup>{point.name}</Popup>
                    </Marker>
                ))}

                <FitBounds points={points} />
            </MapContainer>
        </div>
    )
}