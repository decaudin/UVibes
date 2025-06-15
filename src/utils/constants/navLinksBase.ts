import { NavItems } from "@/types/nav";

export const baseNavLinks: NavItems[] = [
    {
        label: "About",
        href: "/about",
        isActive: (pathname) => pathname === "/about",
    },
    {
        label: "Uv-check",
        href: "/uv-check",
        isActive: (pathname) => pathname.startsWith("/uv-check"),
    },
    {
        label: "Contact",
        href: "/contact",
        isActive: (pathname) => pathname === "/contact",
    }
]