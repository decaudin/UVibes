import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import DashboardClient from "@/components/features/dashboard";

export const metadata: Metadata = generateMetadata({
    title: "Dashboard",
    description: "Manage your saved locations and view real-time UV index data tailored to your spots.",
    robots: "noindex, nofollow"
});

export default function Dashboard() {
    return <DashboardClient />
}