"use client"
import type { FormDataWithCity } from "@/schemas/uvCheckSchema";
import type { City } from "@/types/city";
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
    onCitySelectChange: (selectedCity: City | null) => void;
    t: (key: string) => string;
}

export default function ToggleForm({ register, setValue, errors, getZodErrorMessage, onCitySelectChange, t }: ToggleFormProps) {

    const [cityState, setCityState] = useState<{ query: string; selectedCity: City | null }>({ query: "", selectedCity: null});
    
    const storedMode = typeof window !== "undefined" ? localStorage.getItem("uvMode") as "coords" | "city" : null;
    const [mode, setMode] = useState<"coords" | "city">(storedMode ?? "coords");

    useEffect(() => {
        setValue("mode", mode);
        localStorage.setItem("uvMode", mode);
    }, [mode, setValue]);

    useEffect(() => {
        onCitySelectChange?.(cityState.selectedCity);
    }, [onCitySelectChange, cityState.selectedCity]);

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
                    cityState={cityState}
                    setCityState={setCityState}
                />
            )}
        </div>
    )
}