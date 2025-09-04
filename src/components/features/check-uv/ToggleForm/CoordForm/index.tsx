import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { FormData } from "@/lib/schemas/uvCheckSchema";
import { errorMessageStyles } from "@/styles/classNames";

const wrapperStyles = "flex flex-col w-40 mb-10 mx-auto";
const inputStyles = "h-8 rounded-lg shadow mt-2 pl-2";

interface CoordFormProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
}

export default function CoordForm({ register, errors, getZodErrorMessage, t }: CoordFormProps) {
    return (
        <>
            <Input
                id="latitude" type="number" label={t("latitudeLabel")} step="any" errorMessage={getZodErrorMessage(errors.latitude)}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("latitude")}
            />
            <Input id="longitude" type="number" label={t("longitudeLabel")} step="any" errorMessage={getZodErrorMessage(errors.longitude)}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("longitude")}
            />
            <Input
                id="altitude" type="number" label={t("altitudeLabel")} step="any" errorMessage={getZodErrorMessage(errors.altitude)}
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register("altitude")}
            />
        </>
    )
}