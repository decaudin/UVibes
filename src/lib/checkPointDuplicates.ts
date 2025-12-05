import Point from "@/models/Point";
import type { PointFormData } from "@/schemas/pointSchema";

export const checkPointDuplicates = async (userId: string, data: PointFormData, ignoreId?: string): Promise<"name" | "coords" | null> => {

    if (data.name) {
        const duplicateName = await Point.findOne({
            userId,
            name: data.name,
            ...(ignoreId ? { _id: { $ne: ignoreId } } : {})
        });
        if (duplicateName) return "name";
    }

    if (data.latitude !== undefined && data.longitude !== undefined) {
        const duplicateCoords = await Point.findOne({
            userId,
            latitude: data.latitude,
            longitude: data.longitude,
            ...(ignoreId ? { _id: { $ne: ignoreId } } : {})
        });
        if (duplicateCoords) return "coords";
    }

    return null
}