"use client"
import type { UvApiResponse } from "@/types/UvApiResponse";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/api/useFetch";
import { formatTime } from "@/utils/functions/time/formatTime";
import { convertUtcToLocal } from "@/utils/functions/time/convertUtcToLocal";
import { getUvImage } from "@/utils/functions/uv/getUvImage";
import { getUvMessageKey } from "@/utils/functions/uv/getUvMessageKey";
import UVInfo from "@/components/features/check-uv/results/UVInfo";
import Loader from "@/components/ui/animations/Loader";

export default function UVResultsClient() {

    const [uvData, setUvData] = useState<UvApiResponse | null>(null);
    const [localTime, setLocalTime] = useState<string | null>(null);
    const [timeZone, setTimeZone] = useState<string | null>(null);
    const [filteredExposureTime, setFilteredExposureTime] = useState<number | undefined>(undefined);

    const t = useTranslations();
    const searchParams = useSearchParams();
    const { fetchData, isLoading, error } = useFetch<UvApiResponse>();

    const mode = searchParams.get("mode");
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const altitude = searchParams.get("altitude") ? Number(searchParams.get("altitude")) : undefined;
    const skinType = searchParams.get("skinType") ? Number(searchParams.get("skinType")) : undefined; 

    useEffect(() => {
        const fetchAllData = async () => {
            if (latitude == null || longitude == null) return;

            try {
                let apiUrl = `/api/uv?mode=${mode}&latitude=${latitude}&longitude=${longitude}`;
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
    }, [fetchData, mode, latitude, longitude, altitude, skinType]);

    if (error) return <p className="flex items-center text-center text-red-500 font-bold">{t("uvFetchError")}</p>;

    if (isLoading || !uvData || !localTime || !timeZone ) return <Loader />;

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