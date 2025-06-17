"use client";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { UvCheckSchema, FormData } from "@/lib/schemas/uvCheckSchema";
import Input from "@/components/ui/Input";
import { SkinTypeForm } from "@/components/features/uv-check/SkinTypeForm";
import SubmitButton from "@/components/ui/SubmitButton";
import { errorMessageStyles } from "@/styles/classNames";

const wrapperStyles = "flex flex-col w-36 mb-10 mx-auto";
const inputStyles = "h-8 rounded-lg shadow mt-2 pl-2";

export default function UvCheckForm() {

    const router = useRouter();

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
      
    const onSubmit = (data: FormData) => {

        const { latitude, longitude, skinType } = data;
        const altitudeValue = formValues.altitude ?? undefined;

        if (data.latitude == null || data.longitude == null) {
            alert("Latitude and Longitude are required!");
            return;
        }

        try {
            const query = new URLSearchParams({
                latitude: String(latitude),
                longitude: String(longitude),
                ...(altitudeValue && { altitude: String(altitudeValue) }),
                ...(skinType != null && { skinType: String(skinType) }),
            });         

            router.push(`/uv-check/results?${query.toString()}`);
        } catch (err) {
            console.error("An error has occured : ", err);
        }
    };

    return (
        <form 
            className="w-full shadow-[0px_-4px_6px_0px_rgba(0,0,0,0.3),0px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto my-20 py-12 sm:w-4/5 lg:w-3/5 sm:rounded-lg sm:shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                id="latitude" label="Latitude :" type="number" step="any" errorMessage={errors.latitude?.message}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("latitude")}
            />
            <Input 
                id="longitude" label="Longitude :" type="number" step="any" errorMessage={errors.longitude?.message}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("longitude")}
             />
            <Input
                id="altitude" label="Altitude (optional) :" type="number" step="any" errorMessage={errors.altitude?.message}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("altitude")}
            />
            <SkinTypeForm register={register} />
            <SubmitButton isFormValid={isValid}>Get UV Data</SubmitButton>
        </form>
    )
}