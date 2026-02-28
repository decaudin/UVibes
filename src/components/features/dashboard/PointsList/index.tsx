import type { Point, PointFormData } from "@/schemas/pointSchema";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from '@/hooks/locales';
import { useRedirectToUvResults } from "@/hooks/uv"; 
import { toDMS } from "@/utils/functions/pointsGPS/toDMS";

interface PointsListProps {
    points: Point[];
    deletePoint: (id: string) => Promise<void>;
    addPointAtIndex: (data: PointFormData, index: number) => Promise<Point>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPoint: React.Dispatch<React.SetStateAction<Point | null>>;
    skinType?: number | null;
    t: (key: string) => string;
}

export default function PointsList({ points, deletePoint, addPointAtIndex, setIsModalOpen, setSelectedPoint, skinType, t }: PointsListProps) {

    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    
    const { locale } = useLocale();

    const redirectToUvResults = useRedirectToUvResults();

    const handleDelete = async (id: string) => {

        const deletedPoint = points.find(p => p.id === id);

        await deletePoint(id);

        const toastId = toast(
            <div className="inline-flex flex-wrap items-center justify-center max-w-[320px] gap-x-4 gap-y-2">
                <span className="text-gray-800 xs:whitespace-nowrap">
                    {t("pointLabel")} : {deletedPoint ? (deletedPoint.name.length > 24 ? deletedPoint.name.slice(0, 24) + "…" : deletedPoint.name) : ""} {t("deletedSuccess")}
                </span>
                <button
                    onClick={async () => {
                        toast.dismiss(toastId);

                        if (!deletedPoint) return;

                        const index = points.findIndex((p) => p.id === deletedPoint.id);

                        if (index !== -1) {
                            await addPointAtIndex({
                                name: deletedPoint.name,
                                latitude: deletedPoint.latitude,
                                longitude: deletedPoint.longitude,
                                altitude: deletedPoint.altitude ?? undefined,
                            }, index);

                            toast.success(t("pointRestored"), { className: "sonner-toast" });
                        }
                    }}
                    className="flex-shrink-0 underline text-blue-500 font-bold hover:text-blue-600 transition-colors"
                >
                    {t("undo")}
                </button>
            </div>,
            { className: "sonner-toast toast-delete-point justify-center items-center text-center", style: { backgroundColor: "#f5f5f5" } }
        )
    };
    
    const handlePointClick = (id: string) => { 
        setActiveTooltip((prev) => (prev === id ? null : id)); 
    };

    return (
        <div className="flex-1 border p-6 rounded shadow-md max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                    {points.map((point) => {
                        const { id, name, latitude, longitude, altitude } = point;
                        const coords = toDMS(latitude, longitude);
                        const title = `Latitude: ${coords.lat}, Longitude: ${coords.lng}${altitude ? `, Altitude: ${Math.round(altitude)} m` : ''}`;

                        return (
                            <li key={id} className="p-3 border rounded hover:bg-gray-50 dark:hover:text-black transition">
                                <div className="flex justify-between items-center">
                                    <div
                                        onClick={() => handlePointClick(id)}
                                        title={title}
                                        className="flex items-center"
                                    >
                                        <span
                                            className={`
                                                transition-transform duration-300
                                                ${activeTooltip === id ? "rotate-90 md:rotate-0" : "rotate-0"}
                                            `}
                                        >
                                            📍
                                        </span>
                                        <span className="ml-4">{name}</span>
                                    </div>

                                    <div className="w-[100px] flex justify-between">
                                        <button
                                            onClick={() => redirectToUvResults({ mode: 'coords', latitude: point.latitude, longitude: point.longitude, altitude: point.altitude, skinType, locale })}
                                            title={t("uv")}
                                            className="hover:bg-gray-200 p-1 rounded transition"
                                        >
                                            👁️
                                        </button>
                                        <button                                        
                                            onClick={() => {
                                                setSelectedPoint(point);
                                                setIsModalOpen(true)
                                            }}
                                            title={t("update")}
                                            className="hover:bg-gray-200 p-1 rounded transition"
                                        >
                                            ✏️
                                        </button>
                                        <button                                            
                                            onClick={() => handleDelete(id)}
                                            title={t("delete")}
                                            className="hover:bg-gray-200 p-1 rounded transition"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <AnimatePresence initial={false}>
                                    {activeTooltip === id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                            className="ml-10 text-sm leading-tight text-gray-600 md:hidden space-y-1 overflow-hidden mt-2"
                                        >
                                            <div>Latitude: {coords.lat}</div>
                                            <div>Longitude: {coords.lng}</div>
                                            {altitude ? <div>Altitude: {Math.round(altitude)} m</div> : null}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}