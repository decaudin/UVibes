import Link from "next/link";
import type { ReactNode } from "react";

type AboutLinkProps = {
    locale: string;
    link: string;
    children: ReactNode;
};

export default function AboutLink({ locale, link, children }: AboutLinkProps) {
  
    const width = locale === "fr" ? "w-[200px]" : "w-[150px]";

    return (
        <Link
            href={`/${locale}/${link}`}
            className={`${width} py-2 bg-blue-500 text-white text-center rounded-lg shadow-md hover:bg-blue-600 transition`}
        >
            {children}
        </Link>
    )
}