import type { Props } from "@/types/pageProps";
import { Suspense } from "react";
import { setStaticParamsLocale } from "next-international/server";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import { Loader } from "@/components/ui/Loader";
import UVResultsClient from "@/components/features/check-uv/results";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForNonIndexedPage("results");
};

export default function UVResults() {
    return (
        <Suspense fallback={<Loader />}>
            <UVResultsClient />
        </Suspense>
    )
}