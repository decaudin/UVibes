import type { PointsProps } from "@/types/pointsProps";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FitBounds({ points }: PointsProps) {

    const map = useMap();

    useEffect(() => {
        const bounds = points.map(p => [p.latitude, p.longitude] as [number, number]);
        map.fitBounds(bounds);
    }, [map, points]);

    return null
}