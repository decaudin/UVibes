"use client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useUserStore } from "@/stores/userStore";
import { getNavList } from "@/utils/functions/nav/getNavList";

export function useNavigationItems() {
    
    const pathname = usePathname();
    const router = useRouter();

    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/signout", { method: "POST" });
            if (!res.ok) throw new Error("Sign out failed");

            clearUser();
            toast.success("Signed out successfully! Taking you to Home...", { className: "sonner-toast" });
            router.push("/");
        } catch (error) {
            toast.error("Sign out failed, please try again.", { className: "sonner-toast" });
            console.error(error);
        }
    };

    const navList = getNavList({ isLoggedIn: !!user, onSignOut: handleSignOut });

    return { pathname, navList };
}