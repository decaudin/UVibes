"use client";
import Input from "@/components/ui/Input";
import { handleChange } from "@/utils/function/handleChange";
import { useFetch } from "@/hooks/api/useFetch";
import { useState, FormEvent } from "react";
import { UvInfo } from "@/components/features/UvInfo";
import { UvApiResponse } from "@/types/UvApiResponse";
import SkinTypeExposure from "@/components/features/SkinTypeForm";

export default function UvCheck () {

    const [formData, setFormData] = useState({ latitude: '', longitude: '', altitude: '' })
    const [uvData, setUvData] = useState<UvApiResponse | null>(null);
    const { fetchData, isLoading, error } = useFetch<UvApiResponse>();
    const [selectedSkinType, setSelectedSkinType] = useState<number | null>(null);
    const isFormValid = formData.latitude && formData.longitude;
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (formData.latitude && formData.longitude) {
            const apiUrl = `https://api.openuv.io/api/v1/uv?lat=${formData.latitude}&lng=${formData.longitude}&alt=${formData.altitude}`;
            const data = await fetchData(apiUrl);
            console.log(data);
            if (data && data) {
                setUvData(data);
            }
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    };

    return (
        <>
            {!uvData ?  (
                <form className="w-3/5 rounded-lg shadow-[4px_4px_6px_0px_rgba(0,0,0,0.3)] text-black bg-neutral-100 mx-auto my-20 py-16" onSubmit={handleSubmit}>
                    <Input id="latitude" label="Latitude :" type="text" name="latitude" value={formData.latitude} onChange={handleChange(setFormData)}/>
                    <Input id="longitude" label="Longitude :" type="text" name="longitude" value={formData.longitude} onChange={handleChange(setFormData)}/>
                    <Input id="altitude" label="Altitude (optional) :" type="text" name="altitude" value={formData.altitude} onChange={handleChange(setFormData)}/>
                    <SkinTypeExposure setSelectedSkinType={setSelectedSkinType} />
                    <input className={`flex mx-auto ${isFormValid ? "bg-blue-300" : "bg-gray-500"} ${isFormValid ? "text-black" : "text-white"} rounded-lg shadow py-1 px-4 cursor-pointer`} type="submit" value="Get UV Data" />
                    {isLoading && <div className="w-0 h-0 border-6 border-blue-500 border-b-transparent rounded-full animate-rotate p-2 mx-auto"></div>}
                    {error && <p className="text-red-500">Une erreur est survenue lors de la récupération des données</p>}
                </form> 
            ) : (
                <UvInfo uvData={uvData} />
            )}         
        </>
    )
}