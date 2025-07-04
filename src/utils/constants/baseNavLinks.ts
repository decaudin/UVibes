import { TFunction } from "@/types/i18n";
import { NavItems } from "@/types/nav";

export const baseNavLinks = (t: TFunction): NavItems[] => [
    {
        label: t("navAbout", {}),
        href: "/about",
        isActive: (pathname) => pathname === "/about",
    },
    {
        label: t("navCheckUv", {}),
        href: "/check-uv",
        isActive: (pathname) => pathname.startsWith("/check-uv"),
    },
    {
        label: t("navContact", {}),
        href: "/contact",
        isActive: (pathname) => pathname === "/contact",
    }
]