import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import CheckUVForm from "@/components/features/check-uv";

export const metadata: Metadata = generateMetadata({
    title: "UV Check - Get UV Information",
    description: "Enter your location details (latitude, longitude, altitude) to get the UV index and other relevant UV information for that area.",
    keywords: ["UV check", "UV index", "location UV", "geolocation", "latitude", "longitude", "altitude"],
    url: "https://u-vibes.vercel.app/uv-check"
});

export default function CheckUV() {
    return <CheckUVForm />
}