"use client"
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from '@/hooks/locales/urlLocale';
import { useZodErrorMessage } from "@/hooks/zod";
import { useSkinTypeLabels } from "@/hooks/locales/skinTypeLabels";
import { UvCheckSchema, FormData } from "@/lib/schemas/uvCheckSchema";
import ToggleForm from './ToggleForm';
import SubmitButton from "@/components/ui/SubmitButton";
import SkinTypeForm from "@/components/features/check-uv/SkinTypeForm";

export default function CheckUVForm() {

    const router = useRouter();

    const t = useTranslations();
    
    const { locale } = useLocale();

    const getZodErrorMessage = useZodErrorMessage();
    const skinTypeLabels = useSkinTypeLabels();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(UvCheckSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = !!(
        formValues.latitude && !isNaN(Number(formValues.latitude)) &&
        Number(formValues.latitude) >= -90 && Number(formValues.latitude) <= 90 &&
      
        formValues.longitude && !isNaN(Number(formValues.longitude)) &&
        Number(formValues.longitude) >= -180 && Number(formValues.longitude) <= 180
    );

    const radioTitle = t("radioTitle");
      
    const onSubmit = (data: FormData) => {

        const { latitude, longitude, skinType } = data;
        const altitudeValue = formValues.altitude ?? undefined;

        if (data.latitude == null || data.longitude == null) {
            alert(t("latLongRequired"));
            return;
        }

        try {
            const query = new URLSearchParams({
                latitude: String(latitude),
                longitude: String(longitude),
                ...(altitudeValue && { altitude: String(altitudeValue) }),
                ...(skinType != null && { skinType: String(skinType) }),
            });         

            router.push(`/${locale}/check-uv/results?${query.toString()}`);
        } catch (err) {
            console.error("An error has occured : ", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full shadow-[0px_-4px_6px_0px_rgba(0,0,0,0.3),0px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto py-12 sm:w-4/5 lg:w-3/5 sm:rounded-lg sm:shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)]"
        >
            <ToggleForm register={register} errors={errors} getZodErrorMessage={getZodErrorMessage} t={t} />

            <SkinTypeForm register={register} radioTitle={radioTitle} labels={skinTypeLabels} />
            
            <SubmitButton isFormValid={isValid}>{t("uvCheckButton")}</SubmitButton>
        </form>
    )
}