import { Metadata } from "next";
import { Suspense } from "react";
import { generateMetadata } from "@/lib/metadata";
import { Loader } from "@/components/ui/Loader";
import UVResultsClient from "@/components/features/check-uv/results";

export const metadata: Metadata = generateMetadata({
    title: "UV Results for Your Location",
    description: "Get the latest UV index, safe sun exposure time, and peak UV hours for your selected coordinates. Stay sun safe with personalized UV data.",
    robots: "noindex, nofollow"
});

export default function UVResults() {
    return (
        <Suspense fallback={<Loader />}>
            <UVResultsClient />
        </Suspense>
    )
}