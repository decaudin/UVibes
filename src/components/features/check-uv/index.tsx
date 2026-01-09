"use client"
import type { City } from "@/types/city";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRedirectToUvResults } from '@/hooks/uv';
import { useLocale } from '@/hooks/locales';
import { useZodErrorMessage } from "@/hooks/zod";
import { useUvCheckStore } from '@/stores/forms/uvCheckStore';
import { useResetOnPageLeave } from '@/hooks/lifecycle';
import { UvCheckSchema, FormDataWithCity } from "@/schemas/uvCheckSchema";
import ToggleForm from './ToggleForm';
import SubmitButton from "@/components/ui/SubmitButton";
import SkinTypeForm from "@/components/ui/SkinTypeForm";

export default function CheckUVForm() {

    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const t = useTranslations();

    const redirectToUvResults = useRedirectToUvResults();
    
    const { locale } = useLocale();

    const getZodErrorMessage = useZodErrorMessage();

    const { mode, latitude, longitude, altitude, city, cityLatitude, cityLongitude, skinType, setField, reset } = useUvCheckStore();
    useResetOnPageLeave(reset);

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormDataWithCity>({
        resolver: zodResolver(UvCheckSchema),
        mode: "onBlur",
        shouldFocusError: false,
        shouldUnregister: false,
        defaultValues: { mode, latitude, longitude, altitude/*, city, cityLatitude, cityLongitude*/, skinType }
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.mode === "coords") {
            if (formValues.latitude !== latitude) setField("latitude", formValues.latitude);
            if (formValues.longitude !== longitude) setField("longitude", formValues.longitude);
            if (formValues.altitude !== altitude) setField("altitude", formValues.altitude);
        } else if (formValues.mode === "city") {
            if (formValues.city !== city) setField("city", formValues.city);
            if (formValues.cityLatitude !== cityLatitude) setField("cityLatitude", formValues.cityLatitude);
            if (formValues.cityLongitude !== cityLongitude) setField("cityLongitude", formValues.cityLongitude);
        }

        if (formValues.skinType !== skinType) setField("skinType", formValues.skinType ?? null);
    }, [formValues, mode, latitude, longitude, altitude, city, cityLatitude, cityLongitude, skinType, setField]);

    const isValid = !!(
        (formValues.mode === "coords" &&
            formValues.latitude && !isNaN(Number(formValues.latitude)) &&
            Number(formValues.latitude) >= -90 && Number(formValues.latitude) <= 90 &&

            formValues.longitude && !isNaN(Number(formValues.longitude)) &&
            Number(formValues.longitude) >= -180 && Number(formValues.longitude) <= 180
        ) ||
        (formValues.mode === "city" && selectedCity !== null)
    );

    const radioTitle = t("radioTitle");

    const onSubmit = (data: FormDataWithCity) => redirectToUvResults({ ...data, locale });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full shadow-[0px_-4px_6px_0px_rgba(0,0,0,0.3),0px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto py-12 sm:w-4/5 lg:w-3/5 sm:rounded-lg sm:shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)]"
        >
            <ToggleForm
                register={register}
                setValue={setValue}
                errors={errors}
                getZodErrorMessage={getZodErrorMessage}
                onCitySelectChange={setSelectedCity}
                t={t}
            />

            <SkinTypeForm
                register={register}
                t={t}
                radioTitle={radioTitle}
                className="gap-6 xs:gap-0 xs:w-4/5"
            />
            
            <SubmitButton isFormValid={isValid}>{t("uvCheckButton")}</SubmitButton>
        </form>
    )
}