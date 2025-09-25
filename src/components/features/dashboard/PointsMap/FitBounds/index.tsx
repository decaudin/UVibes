import type { Point } from "@/types/point";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FitBoundsProps {
    points: Point[]
}

export default function FitBounds({ points }: FitBoundsProps) {

    const map = useMap();

    useEffect(() => {
        if (points.length === 0) return;
        const bounds = points.map(p => [p.lat, p.lng] as [number, number]);
        map.fitBounds(bounds);
    }, [map, points]);

    return null
}