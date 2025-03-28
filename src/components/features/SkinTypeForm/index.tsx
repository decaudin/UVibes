import Input from "@/components/ui/Input";
import { handleRadioChange } from "@/utils/functions/input/handleRadioChange";

interface SkinTypeExposureProps {
    setSelectedSkinType: React.Dispatch<React.SetStateAction<number | null>>;
}

export function SkinTypeForm({ setSelectedSkinType }: SkinTypeExposureProps) {

    const wrapperStyles = "flex flex-col mb-10 mx-auto";
    const inputStyles = "h-4 mt-1 cursor-pointer";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center mx-4">For more personalized data, please select your skin type (optional) :</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 xs:flex xs:w-4/5 xs:mx-auto xs:gap-0">
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-1" label="Very fair" type="radio" name="skin-type" value="1" onChange={handleRadioChange(setSelectedSkinType)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-2" label="Fair" type="radio" name="skin-type" value="2" onChange={handleRadioChange(setSelectedSkinType)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-3" label="Medium" type="radio" name="skin-type" value="3" onChange={handleRadioChange(setSelectedSkinType)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-4" label="Olive" type="radio" name="skin-type" value="4" onChange={handleRadioChange(setSelectedSkinType)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-5" label="Brown" type="radio" name="skin-type" value="5" onChange={handleRadioChange(setSelectedSkinType)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="skin-type-6" label="Very dark" type="radio" name="skin-type" value="6" onChange={handleRadioChange(setSelectedSkinType)} />
            </div>
        </div>
    );
}