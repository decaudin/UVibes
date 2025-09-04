"use client"
import { useState } from "react";
import CoordForm from "@/components/features/check-uv/ToggleForm/CoordForm";
import CityForm from "@/components/features/check-uv/ToggleForm/CityForm";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { FormData } from "@/lib/schemas/uvCheckSchema";

interface ToggleFormProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
}

export default function ToggleForm({ register, errors, getZodErrorMessage, t }: ToggleFormProps) {
    
    const [mode, setMode] = useState<"coords" | "city">("coords");

    const getButtonClass = (btnMode: "coords" | "city") => {
        return `flex-1 text-center h-10 rounded-full font-medium transition-colors ${mode === btnMode ? "bg-sky-700 text-white shadow-md" : "text-gray-700 hover:bg-gray-300"}`;
    };

    return (
        <div className="w-full flex flex-col items-center mb-6">

            <p className="text-sm text-gray-600 mb-10">{t("toggleModeDescription")}</p>

            <div className="flex gap-2 bg-gray-200 rounded-full p-1 mb-16 w-full max-w-[90%] xxs:max-w-xs">
                <button
                    type="button"
                    onClick={() => setMode("coords")}
                    className={`${getButtonClass("coords")} text-sm xxs:text-base`}
                >
                    📍 {t("coordsMode")}
                </button>

                <button
                    type="button"
                    onClick={() => setMode("city")}
                    className={` ${getButtonClass("city")} text-sm xxs:text-base`}
                >
                    🏢 {t("cityMode")}
                </button>
            </div>

            {mode === "coords" && (<CoordForm register={register} errors={errors} getZodErrorMessage={getZodErrorMessage} t={t} />)}
            
            {mode === "city" && (<CityForm /*register={register} errors={errors} getZodErrorMessage={getZodErrorMessage}*/ t={t} />)}
        </div>
    )
}