"use client"
import type { PointFormData } from "@/lib/schemas/pointSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import 'leaflet/dist/leaflet.css';
import { PointSchema } from "@/lib/schemas/pointSchema";
import { useUserStore } from "@/stores/userStore";
import { usePoints } from "@/hooks/api/usePoints";
import { authFetch } from "@/utils/functions/api/authFetch";
import Loader from "@/components/ui/animations/Loader";
import SkinTypeSetting from "./SkinTypeSetting";
import ToggleButtons from "@/components/ui/ToggleButtons";
import PointsList from "./PointsList";
import PointsMap from "./PointsMap";
import PointModal from "./PointModal";

export default function DashboardClient() {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const t = useTranslations();
    
    const user = useUserStore((state) => state.user);

    const [view, setView] = useState<'list' | 'map'>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, /*setValue,*/ formState: { errors }, watch } = useForm<PointFormData>({
        resolver: zodResolver(PointSchema),
        mode: "onBlur",
        shouldFocusError: false,
        shouldUnregister: true
    });

    const { pointsGPS, isLoading : isPointLoading, addPoint/*, updatePoint, deletePoint*/ } = usePoints();

    if(!user) return <Loader />

    const updateSkinType = async (skinType: number | null, showToast = true) => {
        setIsLoading(true);

        try {
            const res = await authFetch('/api/user/skinType', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skinType }),
            });

            if (!res.ok) {
                const { code } = await res.json();
                const fallbackMsg = t("errorWhileSaving");
                const translatedMsg = code ? t(code) : fallbackMsg;

                if (code === "INVALID_TOKEN" || code === "UNAUTHORIZED") {
                    useUserStore.getState().clearUser();
                    toast.error(translatedMsg, { className: "sonner-toast" });
                    router.push("/sign-in");
                    return false;
                }
                throw new Error(translatedMsg);
            }

            const updatedUser = await res.json();

            const previousSkinType = useUserStore.getState().user?.skinType ?? null;

            useUserStore.setState((state) => {
                if (!state.user) return state;
                return { user: { ...state.user, skinType: updatedUser.skinType } };
            });

            if (showToast && skinType !== null) {
                const isNew = previousSkinType === null;
                const message = isNew ? t("skinTypeCreated") : t("skinTypeUpdated");
                toast.success(message, { className: "sonner-toast" });
            }
            
            return true;

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message, { className: "sonner-toast" });
            } else {
                toast.error(t("unknownError"), { className: "sonner-toast" });
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddPointSubmit = async (data: PointFormData) => {
        try {
            await addPoint(data);
            setIsModalOpen(false);
            toast.success(t("addPointSuccess"), { className: "sonner-toast" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message, { className: "sonner-toast" });
            } else {
                toast.error(t("unknownError"), { className: "sonner-toast" });
            }
        }
    };

    return (
         <div className="flex flex-col items-center w-full p-4 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mt-8 mb-12">👋 {t("welcome")} {user?.name} !</h1>

            <SkinTypeSetting t={t} onSave={updateSkinType} isSaving={isLoading} skinType={user.skinType} />
            
            <ToggleButtons
                options={[
                    { key: "list", label: t("myPoints"), icon: "📋" },
                    { key: "map", label: t("map"), icon: "🗺️" },
                ]}
                selected={view}
                onSelect={setView}
            />

            <p className="text-sm text-gray-500 mb-6">
                {pointsGPS.length > 0 ? (view === "list" ? t("toggleviewDescriptionList") : t("toggleviewDescriptionMap")) : t("noPoints")}
            </p>

            <div className="w-full flex flex-col md:flex-row gap-6">
                {view === 'list'  ? (pointsGPS.length > 0 && <PointsList points={pointsGPS} t={t} />) : (<PointsMap points={pointsGPS} />)}
            </div>

            <button 
                className="mt-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 fixed md:static bottom-4 right-4 z-50 shadow-lg transition"
                onClick={() => setIsModalOpen(true)}
            >
                {t("addPoint")}
            </button>

            <PointModal 
                isOpen={isModalOpen}
                isLoading={isPointLoading}
                onClose={() => setIsModalOpen(false)}
                register={register}
                errors={errors}
                watch={watch}
                handleSubmit={handleSubmit(handleAddPointSubmit)}
            />
        </div>
    )
}