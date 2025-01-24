"use client";
import Input from "@/components/ui/Input";
import InputSubmit from "@/components/ui/InputSubmit";
import { handleChange } from "@/utils/function/handleChange";
import { useFetch } from "@/hooks/api/useFetch";
import { useState, FormEvent } from "react";
import { UvInfo } from "@/components/features/UvInfo";
import { UvApiResponse } from "@/types/UvApiResponse";
import { SkinTypeForm } from "@/components/features/SkinTypeForm";

export default function UvCheck() {

    const wrapperStyles = "flex flex-col w-36 mb-10 mx-auto";
    const inputStyles = "h-8 rounded-lg shadow mt-2 pl-2";

    const [formData, setFormData] = useState({ latitude: '', longitude: '', altitude: '' });
    const [uvData, setUvData] = useState<UvApiResponse | null>(null);
    const { fetchData, isLoading, error } = useFetch<UvApiResponse>();
    const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null);
    const [filteredExposureTime, setFilteredExposureTime] = useState<number | undefined>(undefined); 
    const isFormValid = !!(formData.latitude && formData.longitude);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (formData.latitude && formData.longitude) {
            const apiUrl = `/api/uv?latitude=${formData.latitude}&longitude=${formData.longitude}&altitude=${formData.altitude || ''}`;
            const data = await fetchData(apiUrl);

            if (data) {
                setUvData(data);

                if (selectedSkinType !== null) {
                    setFilteredExposureTime(data?.result?.safe_exposure_time[`st${selectedSkinType}`]);
                }
            }

        } else {
            alert("Please fill in the latitude and longitude fields.");
        }
    };

    return (
        <>
            {!uvData ? (
                <form className="w-full shadow-[0px_-4px_6px_0px_rgba(0,0,0,0.3),0px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto my-20 py-12 sm:w-4/5 lg:w-3/5 sm:rounded-lg sm:shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)]" onSubmit={handleSubmit}>
                    <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="latitude" label="Latitude :" type="text" name="latitude" value={formData.latitude} onChange={handleChange(setFormData)} />
                    <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="longitude" label="Longitude :" type="text" name="longitude" value={formData.longitude} onChange={handleChange(setFormData)} />
                    <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} id="altitude" label="Altitude (optional) :" type="text" name="altitude" value={formData.altitude} onChange={handleChange(setFormData)} />
                    <SkinTypeForm setSelectedSkinType={setSelectedSkinType} />
                    <InputSubmit value="Get UV Data" isFormValid={isFormValid} />
                    {isLoading && <div className="w-0 h-0 border-6 border-blue-500 border-b-transparent rounded-full animate-rotate p-2 mx-auto"></div>}
                    {error && <p className="text-red-500 text-center mt-8 font-bold">Une erreur est survenue lors de la récupération des données</p>}
                </form>
            ) : (
                <UvInfo uvData={uvData} filteredExposureTime={filteredExposureTime} />
            )}
        </>
    );
}