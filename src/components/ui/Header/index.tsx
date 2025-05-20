"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/constants/navLinks";
import BurgerMenu from "./BurgerMenu";

export default function Header() {

    const pathname = usePathname();

    return (
        <header className="bg-black h-16 flex justify-center items-center">
            <nav className="hidden md:flex">
                {navLinks.map(({ href, label, isActive, className = "" }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`text-sm xxs:text-base ${className} ${isActive(pathname) ? "text-white font-bold" : "text-blue-500"}`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <div className="md:hidden">
                <BurgerMenu />
            </div>
        </header>
    );
}