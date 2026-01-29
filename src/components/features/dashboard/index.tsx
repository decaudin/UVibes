"use client"
import type { PointFormData, Point } from "@/schemas/pointSchema";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import 'leaflet/dist/leaflet.css';
import { PointSchema } from "@/schemas/pointSchema";
import { useUserStore } from "@/stores/userStore";
import { usePoints } from "@/hooks/api/usePoints";
import { authFetch } from "@/utils/functions/api/authFetch";
import { checkPointDuplicates } from "@/utils/functions/pointsGPS/checkPointDuplicates";
import Loader from "@/components/ui/animations/Loader";
import SkinTypeSetting from "./SkinTypeSetting";
import ToggleButtons from "@/components/ui/ToggleButtons";
import PointsList from "./PointsList";
import PointsMap from "./PointsMap";
import PointModal from "@/components/ui/Modal/PointModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function DashboardClient() {

    const [view, setView] = useState<'list' | 'map'>('list');
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [isSkinTypeSaving, setIsSkinTypeSaving] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    const router = useRouter();

    const t = useTranslations();
    
    const user = useUserStore((state) => state.user);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PointFormData>({
        resolver: zodResolver(PointSchema),
        mode: "onBlur",
        shouldFocusError: false,
        shouldUnregister: true
    });

    useEffect(() => {
        if (isUpdateModalOpen && selectedPoint) {
            reset({
                name: selectedPoint.name,
                latitude: selectedPoint.latitude,
                longitude: selectedPoint.longitude,
                altitude: selectedPoint.altitude ?? undefined,
            });
        } else if (isAddModalOpen) {
            reset({
                name: "",
                latitude: undefined,
                longitude: undefined,
                altitude: undefined,
            });
        }
    }, [isUpdateModalOpen, isAddModalOpen, selectedPoint, reset]);

    const { pointsGPS, isLoading : isPointLoading, addPoint, addPointAtIndex, updatePoint, deletePoint } = usePoints();

    if(!user) return <Loader />

    const duplicateMessages = {
        duplicateName: t("duplicatePointName"),
        duplicateCoords: t("duplicatePointCoords"),
    };

    const checkAndToast = (data: PointFormData, ignoreId?: string) => {
        const check = checkPointDuplicates(data, pointsGPS, ignoreId);
        if (!check.ok) {
            toast.error(duplicateMessages[check.key], { className: "sonner-toast" });
            return false;
        }
        return true;
    };

    const updateSkinType = async (skinType: number | null, showToast = true) => {
        setIsSkinTypeSaving(true);

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
            setIsSkinTypeSaving(false);
        }
    };

    const handleAddPointSubmit = async (data: PointFormData) => {
        if (!checkAndToast(data)) return;

        try {
            await addPoint(data);
            setIsAddModalOpen(false);
            toast.success(t("addPointSuccess"), { className: "sonner-toast" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message, { className: "sonner-toast" });
            } else {
                toast.error(t("unknownError"), { className: "sonner-toast" });
            }
        }
    };

    const handleUpdatePointSubmit = async (data: PointFormData) => {
        if (!selectedPoint) return;

        const isModified =
            data.name !== selectedPoint.name ||
            data.latitude !== selectedPoint.latitude ||
            data.longitude !== selectedPoint.longitude ||
            (data.altitude ?? undefined) !== (selectedPoint.altitude ?? undefined);

        if (!isModified) {
            toast.info(t("noChangesDetected"), { className: "sonner-toast" });
            return;
        }

        if (!checkAndToast(data, selectedPoint?.id)) return;

        try {
            await updatePoint({ ...data, id: selectedPoint.id });
            setIsUpdateModalOpen(false);
            toast.success(t("updatePointSuccess"), { className: "sonner-toast" });
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

            <SkinTypeSetting t={t} onSave={updateSkinType} isSaving={isSkinTypeSaving} skinType={user.skinType} />
            
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
                {view === 'list'  ? (
                    pointsGPS.length > 0 && (
                        <PointsList
                            points={pointsGPS}
                            deletePoint={deletePoint}
                            addPointAtIndex={addPointAtIndex}
                            setIsModalOpen={setIsUpdateModalOpen}
                            setSelectedPoint={setSelectedPoint}
                            skinType={user.skinType}
                            t={t}
                        />
                    )
                ) : (
                    <PointsMap points={pointsGPS} />
                )}
            </div>

            <button 
                className="my-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 fixed md:static bottom-4 z-50 shadow-lg transition"
                onClick={() => setIsAddModalOpen(true)}
            >
                {t("addPoint")}
            </button>

            <button 
                className="mt-16 mb-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg transition md:mt-0"
                onClick={() => setIsDeleteAccountModalOpen(true)}
            >
                {t("deleteAccount")}
            </button>

            <PointModal 
                isOpen={isAddModalOpen}
                isLoading={isPointLoading}
                onClose={() => setIsAddModalOpen(false)}
                handleSubmit={handleSubmit(handleAddPointSubmit)}
                register={register}
                errors={errors}
                watch={watch}
                title={t("addPoint")}
                actionLabel={t("addModal")}
            />

            <PointModal 
                isOpen={isUpdateModalOpen}
                isLoading={isPointLoading}
                onClose={() => setIsUpdateModalOpen(false)}
                handleSubmit={handleSubmit(handleUpdatePointSubmit)}
                register={register}
                errors={errors}
                watch={watch}
                title={t("updatePoint")}
                actionLabel={t("updateModal")}
            />

            <DeleteAccountModal
                isOpen={isDeleteAccountModalOpen}
                isLoading={isDeletingAccount}
                setIsLoading={setIsDeletingAccount}
                onClose={() => setIsDeleteAccountModalOpen(false)}
                hasPassword={user.hasPassword}
            />   
        </div>
    )
}