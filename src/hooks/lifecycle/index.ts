"use client"
import { useEffect } from "react";
import { usePathname } from "next/navigation";   

export const useResetOnPageLeave = (resetFn: () => void) => {

    const pathname = usePathname();

    const stripLocale = (path: string) => path.replace(/^\/(fr|en)/, "");

    useEffect(() => {
        const previousPath = stripLocale(pathname);
        return () => {
            const currentPath = stripLocale(window.location.pathname);
            if (currentPath !== previousPath) resetFn();
        };
    }, [pathname, resetFn]);
}