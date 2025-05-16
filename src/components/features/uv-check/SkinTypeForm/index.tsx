import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/lib/schemas/uvCheckSchema";
import Input from "@/components/ui/Input";

interface SkinTypeExposureProps {
    register: UseFormRegister<FormData>;
}

export function SkinTypeForm({ register }: SkinTypeExposureProps) {

    const wrapperStyles = "flex flex-col mb-10 mx-auto";
    const inputStyles = "h-4 mt-1 cursor-pointer";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center mx-4">For more personalized data, please select your skin type (optional) :</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 xs:flex xs:w-4/5 xs:mx-auto xs:gap-0">
                <Input 
                    id="skin-type-1" label="Very fair" type="radio" value="1"
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                    {...register("skinType")}
                />
                <Input
                    id="skin-type-2" label="Fair" type="radio" value="2"
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                    {...register("skinType")}
                />
                <Input 
                    id="skin-type-3" label="Medium" type="radio" value="3" 
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles} 
                    {...register("skinType")}
                />
                <Input 
                    id="skin-type-4" label="Olive" type="radio" value="4" 
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                    {...register("skinType")}
                />
                <Input 
                    id="skin-type-5" label="Brown" type="radio" value="5" 
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                    {...register("skinType")}
                />
                <Input 
                    id="skin-type-6" label="Very dark" type="radio" value="6" 
                    wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                    {...register("skinType")}
                />
            </div>
        </div>
    )
}