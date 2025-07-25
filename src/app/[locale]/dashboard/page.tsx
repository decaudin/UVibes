import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import DashboardClient from "@/components/features/dashboard";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForNonIndexedPage("dashboard");
};

export default function Dashboard() {
    return <DashboardClient />
}