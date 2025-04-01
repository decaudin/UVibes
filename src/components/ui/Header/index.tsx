"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname();

    return (
        <nav className="bg-black flex justify-center items-center h-16">
            <Link href="/" className={`text-sm xxs:text-base ${pathname === "/" ? "text-white font-bold" : "text-blue-500"}`}>Home</Link>
            <Link href="/about" className={`mx-4 xxs:mx-5 text-sm xxs:text-base ${pathname === "/about" ? "text-white font-bold" : "text-blue-500"}`}>About</Link>
            <Link href="/uv-check" className={`text-sm xxs:text-base ${pathname === "/uv-check" ? "text-white font-bold" : "text-blue-500"}`}>Uv-check</Link>
            <Link href="/contact" className={`mx-4 xxs:mx-5 text-sm xxs:text-base ${pathname === "/contact" ? "text-white font-bold" : "text-blue-500"}`}>Contact</Link>
            <Link href="/sign-in" className={`text-sm xxs:text-base ${pathname === "/sign-in" || pathname === "/sign-up" ? "text-white font-bold" : "text-blue-500"}`}>Sign In</Link>
        </nav>
    );
}