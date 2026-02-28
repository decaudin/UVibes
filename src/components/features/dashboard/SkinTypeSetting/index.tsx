"use client"
import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import SkinTypeForm from "@/components/ui/SkinTypeForm";

interface SkinTypeSettingProps {
    t: (key: string) => string;
    onSave: (skinType: number | null, showToast?: boolean) => Promise<boolean>;
    isSaving: boolean;
    skinType?: number | null;
}

export default function SkinTypeSetting({ t, onSave, isSaving, skinType }: SkinTypeSettingProps) {
    
    const [currentSkinType, setCurrentSkinType] = useState<number | null>(skinType ?? null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const skinTypeLabel = skinType ? t(`skinTypes.${skinType}`) : t("skinTypeNotSet");

    const handleSave = async () => {

        if (currentSkinType === skinType) return;

        setIsModalOpen(false);

        const success = await onSave(currentSkinType);

        if (!success) setCurrentSkinType(skinType ?? null);
    };

    const handleDeleteSkinType = async () => {
        
        const previousSkinType = currentSkinType;

        setCurrentSkinType(null);

        const success = await onSave(null, false);
        
        if (!success) {
            setCurrentSkinType(previousSkinType);
            return;
        }

        const toastId = toast(
            <div className="flex items-center justify-between gap-4">
                <span className="text-gray-800">{t("skinTypeDeleted")}</span>
                <button
                    onClick={async () => {
                        toast.dismiss(toastId);
                        const restored = await onSave(previousSkinType, false);
                        if (restored) { 
                            setCurrentSkinType(previousSkinType);
                            toast.success(t("skinTypeRestored"), { className: "sonner-toast" });
                        }
                    }}
                    className="underline text-blue-500 font-bold hover:text-blue-600 transition-colors"
                >
                    {t("undo")}
                </button>
            </div>,
            { className: "sonner-toast toast-delete-point", style: { backgroundColor: "#f5f5f5" } }
        )
    };

    return (
        <div className="mb-12 text-gray-700">
            <span className="dark:text-white">
                👤 {t("skinType")} :{" "}
                <span className={skinType ? "font-bold" : "italic"}>{skinTypeLabel}</span>
            </span>

            <button
                onClick={() => setIsModalOpen(true)}
                aria-label={skinType ? t("editSkinType") : t("setSkinType")}
                className="ml-3 hover:bg-gray-200 p-1 rounded transition"
            >
                {skinType ? "✏️" : "\u2795"}
            </button>

            {skinType && (
                <button
                    onClick={handleDeleteSkinType}
                    aria-label={t("deleteSkinType")}
                    className="hover:bg-gray-200 p-1 rounded transition"
                >
                    🗑️
                </button>
            )}

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={t("chooseSkinType")}
                    actionLabel={t("saveSkinType")}
                    isDisabled={isSaving || currentSkinType === null || currentSkinType === skinType}
                    onSubmit={handleSave}
                >
                    <SkinTypeForm value={currentSkinType} onChange={setCurrentSkinType} t={t} className="w-full" />
                </Modal>
            )}
        </div>
    )
}