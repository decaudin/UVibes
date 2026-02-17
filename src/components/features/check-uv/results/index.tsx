"use client"
import type { UvApiResponse } from "@/types/UvApiResponse";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useSearchParams } from "next/navigation";
import { useUvResultsStore } from "@/stores/uvResultsStore";
import { useFetch } from "@/hooks/api/useFetch";
import { formatTime } from "@/utils/functions/time/formatTime";
import { convertUtcToLocal } from "@/utils/functions/time/convertUtcToLocal";
import { getUvImage } from "@/utils/functions/uv/getUvImage";
import { getUvMessageKey } from "@/utils/functions/uv/getUvMessageKey";
import UVInfo from "@/components/features/check-uv/results/UVInfo";
import Loader from "@/components/ui/animations/Loader";

export default function UVResultsClient() {

    const [fetchError, setFetchError] = useState<string | null>(null);    

    const t = useTranslations();
    const searchParams = useSearchParams();

    const { uvData, localTime, timeZone, filteredExposureTime, setResults } = useUvResultsStore();
    const { fetchData, isLoading, error } = useFetch<UvApiResponse>();

    const mode = searchParams.get("mode");
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const altitude = searchParams.get("altitude") ? Number(searchParams.get("altitude")) : undefined;
    const skinType = searchParams.get("skinType") ? Number(searchParams.get("skinType")) : undefined;

    useEffect(() => {
        if ((uvData && localTime && timeZone) || mode == null) return;

        const fetchAllData = async () => {
            try {
                let apiUrl = `/api/uv?mode=${mode}&latitude=${latitude}&longitude=${longitude}`;
                if (altitude != null) apiUrl += `&altitude=${altitude}`;

                const [data, timeZoneRes] = await Promise.all([
                    fetchData(apiUrl),
                    fetch(`/api/timezone?latitude=${latitude}&longitude=${longitude}`)
                ]);

                if (!data) return;

                const timeZoneData = await timeZoneRes.json();

                const exposureTime = (skinType && data?.result?.safe_exposure_time) ? data.result.safe_exposure_time[`st${skinType}`] : undefined;                

                setResults({
                    uvData: data,
                    localTime: timeZoneData.localTime,
                    timeZone: timeZoneData.timeZone,
                    filteredExposureTime: exposureTime
                });
            } catch {
                setFetchError(t("uvFetchError"))
            }
        };

        fetchAllData();
    }, [uvData, mode, latitude, longitude, altitude, skinType, fetchData, setResults, localTime, timeZone, setFetchError, t]);

    if (error || fetchError) {
        const message = error?.code === "UV_QUOTA_EXCEEDED" ? t(error.code) : t("uvFetchError");

        return <p className="flex items-center text-center text-red-500 font-bold">{message}</p>;
    }

    if (isLoading || !uvData || !localTime || !timeZone) return <Loader />;

    const formattedLocalTime = formatTime(localTime);
    const formattedMaxUvTime = formatTime(convertUtcToLocal(uvData.result.uv_max_time, timeZone));

    const uvLevel = uvData.result.uv;
    const uvMessageKey = getUvMessageKey(uvLevel);
    const uvMessage = t(uvMessageKey);
    const uvImage = getUvImage(uvLevel);

    return (
        <UVInfo
            uvMessage={uvMessage}
            uvImage={uvImage}
            uvData={uvData} 
            localTime={formattedLocalTime} 
            maxUvTime={formattedMaxUvTime}
            filteredExposureTime={filteredExposureTime} 
        />
    )
}