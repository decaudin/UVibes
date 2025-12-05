import type { PointFormData } from "@/schemas/pointSchema";
import type { Point } from "@/schemas/pointSchema";

type CheckPointDuplicatesResult = | { ok: true } | { ok: false; key: "duplicateName" | "duplicateCoords" };

export const checkPointDuplicates = (data: PointFormData, points: Point[], ignoreId?: string): CheckPointDuplicatesResult => {

    const duplicateName = points.some(p => p.name === data.name && p.id !== ignoreId);
    if (duplicateName) return { ok: false, key: "duplicateName" };

    const duplicateCoords = points.some(
        p => p.latitude === data.latitude && p.longitude === data.longitude && p.id !== ignoreId
    );
    if (duplicateCoords) return { ok: false, key: "duplicateCoords" };

    return { ok: true }
}