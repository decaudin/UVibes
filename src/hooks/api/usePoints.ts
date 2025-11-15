import type { Point, PointFormData } from "@/lib/schemas/pointSchema";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { authFetch } from "@/utils/functions/api/authFetch";

export const usePoints = () => {

    const pointsGPS = useUserStore(state => state.pointsGPS);
    const addPointToStore = useUserStore(state => state.addPoint);
    const updatePointInStore = useUserStore(state => state.updatePoint);
    const removePointFromStore = useUserStore(state => state.removePoint);
    const [isLoading, setIsLoading] = useState(false);

    const handleApi = async (endpoint: string, method: string, body?: Partial<PointFormData>) => {
        setIsLoading(true);
        try {
            const res = await authFetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            });

            const data = await res.json();

            if (!res.ok) {
                const { code } = data;
                throw new Error(code || "UNKNOWN_ERROR");
            }

            return data;
        } finally {
            setIsLoading(false);
        }
    };

    const addPoint = async (data: PointFormData) => {
        const newPoint = await handleApi("/api/points", "POST", data);
        addPointToStore({ ...newPoint, id: newPoint._id });
    };

    const updatePoint = async (point: Point) => {
        const updatedPoint = await handleApi(`/api/points/${point.id}`, "PATCH", point);
        updatePointInStore(updatedPoint);
    };

    const deletePoint = async (id: string) => {
        await handleApi(`/api/points/${id}`, "DELETE");
        removePointFromStore(id);
    };

    return { pointsGPS, isLoading, addPoint, updatePoint, deletePoint };
}