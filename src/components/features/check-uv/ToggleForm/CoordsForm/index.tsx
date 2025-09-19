import type { FormDataWithCity } from "@/lib/schemas/uvCheckSchema";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { errorMessageStyles } from "@/styles/classNames";

type FormErrors = FieldErrors<FormDataWithCity> & {
    latitude?: FieldError;
    longitude?: FieldError;
    altitude?: FieldError;
}

interface CoordsFormProps {
    register: UseFormRegister<FormDataWithCity>;
    errors: FormErrors;
    getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
}

const wrapperStyles = "flex flex-col w-40 mb-10 mx-auto";
const inputStyles = "h-8 rounded-lg shadow mt-2 pl-2";

export default function CoordsForm({ register, errors, getZodErrorMessage, t }: CoordsFormProps) {

    const fields: { id: "latitude" | "longitude" | "altitude" ; labelKey: string }[] = [
        { id: "latitude", labelKey: "latitudeLabel" },
        { id: "longitude", labelKey: "longitudeLabel" },
        { id: "altitude", labelKey: "altitudeLabel" },
    ];

    return (
        <>
            {fields.map(({ id, labelKey }) => (
                <Input
                    key={id} id={id} type="number" step="any" label={t(labelKey)} errorMessage={getZodErrorMessage(errors[id])}
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                    {...register(id)}
                />
            ))}
        </>
    )
}