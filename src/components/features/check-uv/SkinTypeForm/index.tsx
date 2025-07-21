import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/lib/schemas/uvCheckSchema";
import { Input } from "@/components/ui/Input";

interface SkinTypeExposureProps {
    register: UseFormRegister<FormData>;
    radioTitle: string;
    labels: Record<number, string>;
}

const wrapperStyles = "flex flex-col mb-10 mx-auto";
const inputStyles = "h-4 mt-1 cursor-pointer";

export function SkinTypeForm({ register, radioTitle, labels }: SkinTypeExposureProps) {

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center mx-4">{radioTitle}</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 xs:flex xs:w-4/5 xs:mx-auto xs:gap-0">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                    <Input
                        key={value}
                        id={`skin-type-${value}`}
                        label={labels[value]}
                        type="radio"
                        value={value}
                        wrapperClassName={wrapperStyles}
                        inputClassName={inputStyles}
                        {...register("skinType")}
                    />
                ))}
            </div>
        </div>
    )
}