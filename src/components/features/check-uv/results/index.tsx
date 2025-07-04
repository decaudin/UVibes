"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import { useSkinTypeLabels } from "@/hooks/locales/skinTypeLabels";
import { UvApiResponse } from "@/types/UvApiResponse";
import { useFetch } from "@/hooks/api/useFetch";
import { formatTime } from "@/utils/functions/time/formatTime";
import { convertUtcToLocal } from "@/utils/functions/time/convertUtcToLocal";
import { getUvImage } from "@/utils/functions/uv/getUvImage";
import { getUvMessageKey } from "@/utils/functions/uv/getUvMessageKey";
import { UVInfo } from "@/components/features/check-uv/results/UVInfo";
import { Loader } from "@/components/ui/Loader";

export default function UVResultsClient() {

    const t = useI18n();
    const skinTypeLabels = useSkinTypeLabels();

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

    if (error) return <p className="flex items-center text-center text-red-500 font-bold">{t("uvFetchError")}</p>;

    if (isLoading || !uvData || !localTime || !timeZone ) return <Loader />;

    const formattedLocalTime = formatTime(localTime);
    const formattedMaxUvTime = formatTime(convertUtcToLocal(uvData.result.uv_max_time, timeZone));

    const uvLevel = uvData.result.uv;
    const uvMessageKey = getUvMessageKey(uvLevel);
    const uvMessage = t(uvMessageKey);
    const uvImage = getUvImage(uvLevel);

    const labels = {
        title: t("uvInfo.title"),
        currentUvLabel: t("uvInfo.currentUvIndex"),
        maxUvLabel: t("uvInfo.maxUvIndexOfDay"),
        ozoneLabel: t("uvInfo.ozoneLevel"),
        ozoneUnit: t("uvInfo.ozoneUnit")
    };

    const exposureTexts = {
        titleForUserSkin: t("safeExposureDuration.userSkinTitle"),
        titleForAllSkins: t("safeExposureDuration.allSkinsTitle"),
        riskFreeMessage: t("safeExposureDuration.riskFree")
    };

    return (
        <UVInfo
            labels={labels}
            uvMessage={uvMessage}
            uvImage={uvImage}
            uvData={uvData} 
            localTime={formattedLocalTime} 
            maxUvTime={formattedMaxUvTime}
            exposureTexts={exposureTexts}
            skinTypeLabels={skinTypeLabels}
            filteredExposureTime={filteredExposureTime} 
        />
    )
}