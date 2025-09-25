"use client"
import { useState } from "react";

interface SkinTypeSettingProps {
    skinType?: number | null;
    t: (key: string) => string;
}

export default function SkinTypeSetting({ skinType, t }: SkinTypeSettingProps) {

    const [isModalOpen, setModalOpen] = useState(false);

    const skinTypeLabel = skinType ? `Type ${skinType}` : t("skinTypeNotSet");

    return (
        <div className="mb-12 text-gray-700">
            <span className="mr-2">👤 {t("skinType")} :</span>
            <span className="font-medium">{skinTypeLabel}</span>
            <button
                onClick={() => setModalOpen(true)}
                aria-label={skinType ? t("editSkinType") : t("setSkinType")}
                className="ml-3 hover:bg-gray-200 p-1 rounded transition"
            >
                {skinType ? "✏️" : "\u2795" }
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black bg-opacity-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">{t("chooseSkinType")}</h2>
                        <select
                            defaultValue={skinType ?? ""}
                            className="w-full border p-2 rounded mb-6"
                        >
                            <option value="">{t("skinTypeNotSet")}</option>
                            {[1, 2, 3, 4, 5, 6].map((value) => (
                                <option key={value} value={value}>
                                    {t(`skinTypes.${value}`)}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setModalOpen(false)}
                            >
                                {t("cancelModal")}
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                // TODO: call API pour sauvegarder skinType en DB
                                    setModalOpen(false);
                                }}
                            >
                                {t("saveSkinType")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}