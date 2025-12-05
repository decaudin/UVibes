import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/schemas/uvCheckSchema";
import { Input } from "@/components/ui/Input";

interface SkinTypeFormProps {
    t: (key: string) => string;
    register?: UseFormRegister<FormData>;
    value?: number | null;
    onChange?: (value: number) => void;
    radioTitle?: string;
    className?: string;
}

export default function SkinTypeForm({ t, register, value, onChange, radioTitle, className }: SkinTypeFormProps) {
    return (
        <div className="flex flex-col items-center">
            {radioTitle && <h2 className="text-center mx-4">{radioTitle}</h2>}
            <div className={`mt-8 grid grid-cols-3 xs:flex xs:mx-auto ${className}`}>
                {[1, 2, 3, 4, 5, 6].map((v) => (
                    <Input
                        key={v}
                        id={`skin-type-${v}`}
                        label={t(`skinTypes.${v}`)}
                        type="radio"
                        value={v}
                        {...(register ? register("skinType") : {checked: value === v, onChange: () => onChange?.(v)})}
                        wrapperClassName="flex flex-col mb-10 mx-auto"
                        labelClassName="cursor-pointer"
                        inputClassName="h-4 mt-1 cursor-pointer"
                    />
                ))}
            </div>
        </div>
    )
}