import { ChangeEvent } from "react";
import Input from "@/components/ui/Input";

interface SkinTypeExposureProps {
    setSelectedSkinType: React.Dispatch<React.SetStateAction<number | null>>;
  }

const SkinTypeExposure: React.FC<SkinTypeExposureProps> = ({ setSelectedSkinType }) => {

        const handleSkinTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSelectedSkinType(Number(e.target.value)); // Convertir la valeur en nombre
          };

    // const getSafeExposureTime = (skinType) => {
    //     return safeExposureData[`st${skinType}`] || 0;
    // };

    return (
        <div className="flex flex-col items-center">
            <h2>Select your skin type :</h2>
            <form className="flex w-4/5 mx-auto mt-4 items-center">
                <Input className="shadow-none flex flex-col items-center" id="skin-type-1" label="Very fair" type="radio" name="skin-type" value="1" onChange={handleSkinTypeChange} />
                <Input className="shadow-none" id="skin-type-2" label="Fair" type="radio" name="skin-type" value="2" onChange={handleSkinTypeChange} />
                <Input className="shadow-none" id="skin-type-3" label="Medium" type="radio" name="skin-type" value="3" onChange={handleSkinTypeChange} />
                <Input className="shadow-none" id="skin-type-4" label="Olive" type="radio" name="skin-type" value="4" onChange={handleSkinTypeChange} />
                <Input className="shadow-none" id="skin-type-5" label="Brown" type="radio" name="skin-type" value="5" onChange={handleSkinTypeChange} />
                <Input className="shadow-none" id="skin-type-6" label="Very dark" type="radio" name="skin-type" value="6" onChange={handleSkinTypeChange} />
            </form>
            {/* {selectedSkinType && (
                <p>
                For skin type {selectedSkinType}, your safe exposure time is{" "}
                {getSafeExposureTime(selectedSkinType)} minutes.
                </p>
            )} */}
        </div>
    );
};

export default SkinTypeExposure;
