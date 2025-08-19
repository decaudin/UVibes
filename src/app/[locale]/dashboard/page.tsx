import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import DashboardClient from "@/components/features/dashboard";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("dashboard") };

export default async function Dashboard() { return <DashboardClient /> }