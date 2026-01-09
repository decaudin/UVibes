"use client"
import type { FormDataWithCity } from "@/schemas/uvCheckSchema";
import type { City } from "@/types/city";
import { useState, useEffect, useRef } from "react";
import { UseFormSetValue, UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useUvCheckStore } from '@/stores/forms/uvCheckStore'
import { useFetch } from "@/hooks/api/useFetch";
import { Input } from "@/components/ui/Input";

interface CityFormProps {
    register: UseFormRegister<FormDataWithCity>;
    setValue: UseFormSetValue<FormDataWithCity>;
    errors: FieldErrors<FormDataWithCity>;
    getZodErrorMessage: (error?: FieldError) => string | undefined;
    t: (key: string) => string;
    cityState: { query: string; selectedCity: City | null};
    setCityState: React.Dispatch<React.SetStateAction<{ query: string; selectedCity: City | null }>>;
}

const wrapperCityStyles = "mt-2 mb-10 text-center";
const inputCityStyles = "w-60 xxs:w-80 h-10 rounded-lg shadow pl-14 pr-8";
const errorMessageCityStyles = "text-sm text-red-500 w-60 mt-2 xxs:w-80";

export default function CityForm({ register, setValue, errors, getZodErrorMessage, t, cityState, setCityState }: CityFormProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<City[]>([]);

    const { query, selectedCity } = cityState;

    const setField = useUvCheckStore(state => state.setField);

    const containerRef = useRef<HTMLDivElement>(null);
    
    const { fetchData } = useFetch<{ cities: City[] }>();

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        if (selectedCity?.name === query) {
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            const data = await fetchData(`/api/cities?q=${query}`);
            const cities = data?.cities || [];
            setSuggestions(cities);
            setIsOpen(cities.length > 0);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, fetchData, selectedCity]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (city: City) => {
        setCityState({ query: city.name, selectedCity: city });
        setSuggestions([]);
        setValue("city", city.name);
        setValue("cityLatitude", city.latitude);
        setValue("cityLongitude", city.longitude);
        setField("cityQuery", city.name);
        setField("citySelected", city);
        setIsOpen(false);
    };

    const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        setCityState(prev => ({
            query: text,
            selectedCity: prev.selectedCity && text !== prev.selectedCity.name ? null : prev.selectedCity
        }));

        setField("cityQuery", text);

        if (selectedCity && text !== selectedCity.name) {
            setValue("city", "");
            // Invalidate latitude/longitude on city change.
            // TS expects number, so we safely cast via unknown.
            setValue("cityLatitude", undefined as unknown as number);
            setValue("cityLongitude", undefined as unknown as number);

            setField("citySelected", null);
        }
    };

    const cityQuery = useUvCheckStore(state => state.cityQuery);
    const citySelectedFromStore = useUvCheckStore(state => state.citySelected);
    
    useEffect(() => {
        if (cityQuery) setCityState(prev => ({ ...prev, query: cityQuery }));
    }, [cityQuery, setCityState]);

    useEffect(() => {
        if (!citySelectedFromStore) return;

        setCityState({
            query: citySelectedFromStore.name,
            selectedCity: citySelectedFromStore,
        });

        setValue("city", citySelectedFromStore.name, { shouldValidate: false });
        setValue("cityLatitude", citySelectedFromStore.latitude, { shouldValidate: false });
        setValue("cityLongitude", citySelectedFromStore.longitude, { shouldValidate: false });

        setIsOpen(false);
    }, [citySelectedFromStore, setCityState, setValue]);

    return (
        <div ref={containerRef} className="relative w-80">
            <span className="absolute left-12 top-1/2 -translate-y-1/2 -mt-[16px] text-lg xxs:left-2">🏙️</span>

            <Input 
                id="city" type="text" label={t("cityLabel")} placeholder={`${t("cityPlaceholder")}`}
                errorMessage={getZodErrorMessage(errors.city)} errorMessageClassName={errorMessageCityStyles}
                wrapperClassName={wrapperCityStyles} labelClassName="sr-only" inputClassName={`${inputCityStyles}`}
                {...register("city")} value={query} onChange={handleCityInputChange}
            />

            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSelect(city)}
                            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}