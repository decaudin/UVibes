'use client';
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/components/ui/Loader";

export default function DashboardClient() {

    const user = useUserStore((state) => state.user);

    if(!user) return <Loader />

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl">Welcome {user?.name} !</h1>
            <p className="my-8">In Progress ..</p>
        </div>
    );
}