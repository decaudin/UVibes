import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import UvResultsClient from "@/components/features/uv-check/results";

export const metadata: Metadata = generateMetadata({
    title: "UV Results for Your Location",
    description: "Get the latest UV index, safe sun exposure time, and peak UV hours for your selected coordinates. Stay sun safe with personalized UV data.",
    keywords: ["UV index results", "safe sun exposure", "UV data by coordinates", "UV tracking", "sun protection"],
    url: "https://u-vibes.vercel.app/uv-check/results"
});

export default function UvResults() {
    return <UvResultsClient />
}