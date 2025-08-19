import { Suspense } from "react";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import { Loader } from "@/components/ui/Loader";
import UVResultsClient from "@/components/features/check-uv/results";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("results") }

export default async function UVResults() {

    return (
        <Suspense fallback={<Loader />}>
            <UVResultsClient />
        </Suspense>
    )
}