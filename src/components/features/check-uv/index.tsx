"use client"
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from '@/hooks/locales';
import { useZodErrorMessage } from "@/hooks/zod";
import { UvCheckSchema, FormDataWithCity } from "@/lib/schemas/uvCheckSchema";
import ToggleForm from './ToggleForm';
import SubmitButton from "@/components/ui/SubmitButton";
import SkinTypeForm from "@/components/ui/SkinTypeForm";

export default function CheckUVForm() {

    const router = useRouter();

    const t = useTranslations();
    
    const { locale } = useLocale();

    const getZodErrorMessage = useZodErrorMessage();

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormDataWithCity>({
        resolver: zodResolver(UvCheckSchema),
        mode: "onBlur",
        shouldFocusError: false,
        shouldUnregister: true
    });

    const formValues = watch();

    const isValid = !!(
        (formValues.mode === "coords" &&
            formValues.latitude && !isNaN(Number(formValues.latitude)) &&
            Number(formValues.latitude) >= -90 && Number(formValues.latitude) <= 90 &&

            formValues.longitude && !isNaN(Number(formValues.longitude)) &&
            Number(formValues.longitude) >= -180 && Number(formValues.longitude) <= 180
        ) ||
        (formValues.mode === "city" && formValues.city)
    );

    const radioTitle = t("radioTitle");

    const onSubmit = (data: FormDataWithCity) => {

        const lat = data.mode === "coords" ? data.latitude : data.cityLatitude;
        const lng = data.mode === "coords" ? data.longitude : data.cityLongitude;

        const queryParams: Record<string, string> = {
            mode: data.mode,
            latitude: `${lat}`,
            longitude: `${lng}`,
            ...(data.mode === "coords" && data.altitude ? { altitude: `${data.altitude}` } : {}),
            // ...(data.mode === "coords" && data.altitude !== undefined ? { altitude: `${data.altitude}` } : {}),
            ...(data.skinType != null && { skinType: `${data.skinType}` }),
        };

        const query = new URLSearchParams(queryParams);
        router.push(`/${locale}/check-uv/results?${query.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full shadow-[0px_-4px_6px_0px_rgba(0,0,0,0.3),0px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto py-12 sm:w-4/5 lg:w-3/5 sm:rounded-lg sm:shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)]"
        >
            <ToggleForm register={register} setValue={setValue} errors={errors} getZodErrorMessage={getZodErrorMessage} t={t} />

            <SkinTypeForm register={register} t={t} radioTitle={radioTitle} className="gap-6 xs:gap-0 xs:w-4/5" />
            
            <SubmitButton isFormValid={isValid}>{t("uvCheckButton")}</SubmitButton>
        </form>
    )
}