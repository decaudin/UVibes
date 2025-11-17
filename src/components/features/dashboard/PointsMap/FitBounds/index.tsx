import type { PointsProps } from "@/types/pointsProps";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitBounds({ points }: PointsProps) {

    const map = useMap();

    useEffect(() => {
        if (points.length === 1) {
            const p = points[0];
            map.setView([p.latitude, p.longitude], 8);
        } else {
            const bounds = points.map(p => [p.latitude, p.longitude] as [number, number]);
            const leafletBounds = L.latLngBounds(bounds);

            const latDiff = leafletBounds.getNorth() - leafletBounds.getSouth();
            const lngDiff = leafletBounds.getEast() - leafletBounds.getWest();
            const maxDiff = Math.max(latDiff, lngDiff);

            const maxZoom = maxDiff < 0.01 ? 10 : maxDiff < 0.05 ? 11 : 12;

            map.fitBounds(bounds, { padding: [50, 50], maxZoom });
        }
    }, [map, points]);

    return null
}