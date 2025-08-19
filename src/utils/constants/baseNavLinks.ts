import type { TFunctionType } from "@/types/i18n";
import { NavItems } from "@/types/nav";

export const baseNavLinks = (t: TFunctionType, locale: string): NavItems[] => [
    {
        label: t("navAbout", {}),
        href: `/${locale}/about`,
        isActive: (pathname) => pathname.startsWith("/about"),
    },
    {
        label: t("navCheckUv", {}),
        href: `/${locale}/check-uv`,
        isActive: (pathname) => pathname.startsWith("/check-uv"),
    },
    {
        label: t("navContact", {}),
        href: `/${locale}/contact`,
        isActive: (pathname) => pathname === "/contact",
    },
];