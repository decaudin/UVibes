// import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/Input";


interface CityFormProps {
    // register: UseFormRegister<FormData>;
    // errors: FieldErrors<FormData>;
    // getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
}

const wrapperCityStyles = "mt-2 mb-10 text-center";
const inputCityStyles = "w-60 xxs:w-80 h-10 rounded-lg shadow pl-2";

export default function CityForm({/* register, errors, getZodErrorMessage,*/ t }: CityFormProps) {

    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className="relative w-80">
            <Input 
                id="city" type="text" label={t("cityLabel")} placeholder={`🏙️ ${t("cityPlaceholder")}`} /*errorMessage={getZodErrorMessage(errors.city)}*/
                wrapperClassName={wrapperCityStyles} labelClassName="sr-only" inputClassName={`${inputCityStyles} pr-8`}
                // {...register("city")}
            />
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-7 text-gray-500 focus:outline-none"
                aria-label={isOpen ? t("cityCloseSuggestions") : t("cityOpenSuggestions")}
            >
                {isOpen ? "▲" : "▼"}
            </button>
        </div>
    )
}