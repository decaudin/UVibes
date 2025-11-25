import { useRouter } from "next/navigation";
import { FormDataWithCity } from "@/lib/schemas/uvCheckSchema";

export const useRedirectToUvResults = () => {
    const router = useRouter();

    return (data: FormDataWithCity & { locale: string }) => {
        const latitude = data.mode === "coords" ? data.latitude : data.cityLatitude;
        const longitude = data.mode === "coords" ? data.longitude : data.cityLongitude;
        const altitude = data.mode === "coords" ? data.altitude : undefined;

        const queryParams: Record<string, string> = {
            mode: data.mode,
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            ...(altitude ? { altitude: `${altitude}` } : {}),
            // ...(altitude !== undefined ? { altitude: `${altitude}` } : {}),
            ...(data.skinType != null ? { skinType: `${data.skinType}` } : {}),
        };

        const query = new URLSearchParams(queryParams).toString();
        router.push(`/${data.locale}/check-uv/results?${query}`);
    }
}