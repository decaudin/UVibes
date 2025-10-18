"use client"
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';
import 'leaflet/dist/leaflet.css';
import { useUserStore } from "@/stores/userStore";
import Loader from "@/components/ui/animations/Loader";
import SkinTypeSetting from "./SkinTypeSetting";
import ToggleButtons from "@/components/ui/ToggleButtons";
import PointsList from "./PointsList";
import PointsMap from "./PointsMap";
import PointModal from "./PointModal";

export default function DashboardClient() {

    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations();
    
    const user = useUserStore((state) => state.user);

    const [view, setView] = useState<'list' | 'map'>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(!user) return <Loader />

    const points = [
        { id: "1", name: "Buenos Aires - Stade Monumental", lat: -34.5454, lng: -58.4498 },
        { id: "2", name: "Naples - Stade San Paolo", lat: 40.8280, lng: 14.1930 },
        { id: "3", name: "Toulouse - Stadium", lat: 43.5833, lng: 1.4340 },
        { id: "4", name: "Paris - Stade de France", lat: 48.9244, lng: 2.3601 },
    ];

    const updateSkinType = async (skinType: number | null, showToast = true) => {
        setIsLoading(true);

        try {
            const res = await fetch('/api/user/skinType', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skinType }),
                credentials: 'include',
            });

            if (!res.ok) {
                const { code } = await res.json();
                const fallbackMsg = t("errorWhileSaving");
                const translatedMsg = code ? t(code) : fallbackMsg;
                throw new Error(translatedMsg);
            }

            const updatedUser = await res.json();
            useUserStore.setState((state) => {
                if (!state.user) return state;
                return { user: { ...state.user, skinType: updatedUser.skinType } };
            });


            if (showToast && skinType !== null) toast.success(t("skinTypeSaved"), { className: "sonner-toast" });
            
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
                {view === "list" ? t("toggleviewDescriptionList") : t("toggleviewDescriptionMap")}
            </p>

            <div className="w-full flex flex-col md:flex-row gap-6">
                {view === 'list' ? (<PointsList points={points} t={t} />) : (<PointsMap points={points} />)}
            </div>

            <button 
                className="mt-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 fixed md:static bottom-4 right-4 z-50 shadow-lg transition"
                onClick={() => setIsModalOpen(true)}
            >
                {t("addPoint")}
            </button>

            <PointModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}