import { Metadata } from "next";
import { Suspense } from "react";
import { generateMetadata } from "@/lib/metadata";
import { Loader } from "@/components/ui/Loader";
import UvResultsClient from "@/components/features/uv-check/results";

export const metadata: Metadata = generateMetadata({
    title: "UV Results for Your Location",
    description: "Get the latest UV index, safe sun exposure time, and peak UV hours for your selected coordinates. Stay sun safe with personalized UV data.",
    robots: "noindex, nofollow"
});

export default function UvResults() {
    return (
        <Suspense fallback={<Loader />}>
            <UvResultsClient />
        </Suspense>
    )
}