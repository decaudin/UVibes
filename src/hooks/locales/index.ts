"use client"
import { usePathname } from "next/navigation";

export const useLocale = () => {
    const pathname = usePathname();
    const locale = pathname.split("/")[1];

    return { locale, pathname };
}