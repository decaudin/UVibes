'use client';
import { useI18n } from "@/locales/client";
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/components/ui/Loader";

export default function DashboardClient() {

    const t = useI18n();
    
    const user = useUserStore((state) => state.user);

    if(!user) return <Loader />

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl">{t("welcome")} {user?.name} !</h1>
            <p className="my-8">{t("inProgress")}</p>
        </div>
    );
}