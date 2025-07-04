"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/hooks/context";
import { useI18n } from "@/locales/client";

export default function Footer() {

    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const t = useI18n();

    const currentLang = pathname.split("/")[1];
    const newLang = currentLang === "fr" ? "en" : "fr";
    
    const toggleLang = () => {
        const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
        router.push(newPath);
    };

    return (
        <footer className="h-16 bg-black flex items-center justify-center gap-4 mt-6 px-2 xs:gap-0">
            <Link href="/contact">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-6 h-6 cursor-pointer hover:stroke-gray-300"
                    aria-label="Contact"
                    role="img"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                </svg>
            </Link>

            <p className="text-white text-center w-full sm:w-2/3 ">
                <span
                    className="cursor-pointer"
                    onClick={() => toggleTheme()}
                    aria-label="Toggle theme"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
                >
                    {theme === "light" ? "☀️" : "🌙"}
                </span> {t("footerSlogan")}
            </p>

            <button
                onClick={toggleLang}
                className="text-white border border-white min-w-[48px] py-1 rounded hover:bg-white hover:text-black transition"
                aria-label="Toggle language"
            >
                {newLang.toUpperCase()}
            </button>
        </footer>
    )
}