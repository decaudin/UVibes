// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { toast } from 'sonner';
// import { useI18n } from "@/locales/client";
// import { useUserStore } from "@/stores/userStore";
// import { getNavList } from "@/utils/functions/nav/getNavList";

// export const useNavigationItems = () => {
    
//     const t = useI18n();
//     const pathname = usePathname();
//     const router = useRouter();

//     const user = useUserStore((state) => state.user);
//     const clearUser = useUserStore((state) => state.clearUser);

//     const handleSignOut = async () => {
//         try {
//             const res = await fetch("/api/signout", { method: "POST" });
//             if (!res.ok) throw new Error("Sign out failed");

//             clearUser();
//             toast.success(t("signOutSuccessToast"), { className: "sonner-toast" });
//             router.push("/");
//         } catch (error) {
//             toast.error(t("signOutErrorToast"), { className: "sonner-toast" });
//             console.error(error);
//         }
//     };

//     const navList = getNavList({ isLoggedIn: !!user, pathname, onSignOut: handleSignOut, t });

//     return { pathname, navList };
// }


"use client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";
import { useI18n } from "@/locales/client";
import { useUserStore } from "@/stores/userStore";
import { getNavList } from "@/utils/functions/nav/getNavList";

export const useNavigationItems = () => {
    
    const t = useI18n();
    const pathname = usePathname();
    const router = useRouter();

    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    const handleSignOut = useCallback(async () => {
        try {
            const res = await fetch("/api/signout", { method: "POST" });
            if (!res.ok) throw new Error("Sign out failed");

            clearUser();
            toast.success(t("signOutSuccessToast"), { className: "sonner-toast" });
            router.push("/");
        } catch (error) {
            toast.error(t("signOutErrorToast"), { className: "sonner-toast" });
            console.error(error);
        }
    }, [clearUser, router, t]);

    const navList = useMemo(() => {
        return getNavList({ isLoggedIn: !!user, pathname, onSignOut: handleSignOut, t });
    }, [t, pathname, user, handleSignOut]);

    return { pathname, navList };
};