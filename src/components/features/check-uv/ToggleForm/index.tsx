"use client"
import type { FormDataWithCity } from "@/lib/schemas/uvCheckSchema";
import { useState, useEffect } from "react";
import ToggleButtons from "@/components/ui/ToggleButtons";
import CoordsForm from "@/components/features/check-uv/ToggleForm/CoordsForm";
import CityForm from "@/components/features/check-uv/ToggleForm/CityForm";
import { UseFormRegister, FieldErrors, FieldError, UseFormSetValue } from "react-hook-form";

interface ToggleFormProps {
    register: UseFormRegister<FormDataWithCity>;
    setValue: UseFormSetValue<FormDataWithCity>;
    errors: FieldErrors<FormDataWithCity>;
    getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
}

export default function ToggleForm({ register, setValue, errors, getZodErrorMessage, t }: ToggleFormProps) {
    
    const [mode, setMode] = useState<"coords" | "city">("coords");

    useEffect(() => {
        setValue("mode", mode);
    }, [mode, setValue]);

    return (
        <div className="w-full flex flex-col items-center mb-6">
            <p className="text-sm text-gray-600 mb-10">{t("toggleModeDescription")}</p>

            <ToggleButtons
                options={[
                    { key: "coords", label: t("coordsMode"), icon: "📍" },
                    { key: "city", label: t("cityMode"), icon: "🏢" },
                ]}
                selected={mode}
                onSelect={setMode}
            />

            {mode === "coords" && (
                <CoordsForm
                    register={register}
                    errors={errors}
                    getZodErrorMessage={getZodErrorMessage}
                    t={t}
                />
            )}
            
            {mode === "city" && (
                <CityForm 
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    getZodErrorMessage={getZodErrorMessage}
                    t={t}
                />
            )}
        </div>
    )
}