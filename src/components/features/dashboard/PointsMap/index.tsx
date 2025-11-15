import type { PointsProps } from "@/types/pointsProps";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { defaultIcon } from "@/utils/constants/leaflet";
import FitBounds from "./FitBounds";

export default function PointsMap({ points }: PointsProps) {

    return (
        <div className="flex-1 border p-6 rounded shadow-md h-96 md:h-auto">
            <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="w-full h-96 md:h-[500px] rounded">
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

                {points?.map(point => (
                    <Marker key={point.id} position={[point.latitude, point.longitude]} icon={defaultIcon}>
                        <Popup>{point.name}</Popup>
                    </Marker>
                ))}

                {points.length > 0 && <FitBounds points={points} />}
            </MapContainer>
        </div>
    )
}