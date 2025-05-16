"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UvApiResponse } from "@/types/UvApiResponse";
import { useFetch } from "@/hooks/api/useFetch";
import { formatTime } from "@/utils/functions/time/formatTime";
import { convertUtcToLocal } from "@/utils/functions/time/convertUtcToLocal";
import { UvInfo } from "@/components/features/uv-check/results/UvInfo";
import { Loader } from "@/components/ui/Loader";

export default function UvResultsClient() {

    const searchParams = useSearchParams();
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const altitude = searchParams.get("altitude") ? Number(searchParams.get("altitude")) : undefined;
    const skinType = searchParams.get("skinType") ? Number(searchParams.get("skinType")) : undefined;

    const { fetchData, isLoading, error } = useFetch<UvApiResponse>();
    const [uvData, setUvData] = useState<UvApiResponse | null>(null);
    const [localTime, setLocalTime] = useState<string | null>(null);
    const [timeZone, setTimeZone] = useState<string | null>(null);
    const [filteredExposureTime, setFilteredExposureTime] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchAllData = async () => {
            if (latitude == null || longitude == null) return;

            try {
                let apiUrl = `/api/uv?latitude=${latitude}&longitude=${longitude}`;
                if (altitude != null) apiUrl += `&altitude=${altitude}`;

                const data = await fetchData(apiUrl);
                setUvData(data ?? null);

                if (skinType && data?.result?.safe_exposure_time) {
                    setFilteredExposureTime(data.result.safe_exposure_time[`st${skinType}`]);
                }

                const timeZoneRes = await fetch(`/api/timezone?latitude=${latitude}&longitude=${longitude}`);
                const timeZoneData = await timeZoneRes.json();
                setLocalTime(timeZoneData.localTime ?? null);
                setTimeZone(timeZoneData.timeZone ?? null);

            } catch (err) {
                console.error("Error : ", err);
            }
        };

        fetchAllData();
    }, [fetchData, latitude, longitude, altitude, skinType]);

    if (error) return <p className="flex items-center text-center text-red-500 font-bold">An error occurred while fetching the data.</p>;

    if (isLoading || !uvData || !localTime || !timeZone ) return <Loader />;

    const formattedLocalTime = formatTime(localTime);
    const formattedMaxUvTime = formatTime(convertUtcToLocal(uvData.result.uv_max_time, timeZone));

    return <UvInfo uvData={uvData} filteredExposureTime={filteredExposureTime} localTime={formattedLocalTime} maxUvTime={formattedMaxUvTime} />
}