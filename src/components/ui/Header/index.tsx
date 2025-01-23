"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname();

    return (
        <nav className="bg-black flex justify-center items-center h-16">
            <Link href="/" className={pathname === "/" ? "text-white font-bold" : "text-blue-500"}>Home</Link>
            <Link href="/about" className={`mx-5 ${pathname === "/about" ? "text-white font-bold" : "text-blue-500"}`}>About</Link>
            <Link href="/uv-check" className={pathname === "/uv-check" ? "text-white font-bold" : "text-blue-500"}>Uv-check</Link>
            <Link href="/contact" className={`ml-5 ${pathname === "/contact" ? "text-white font-bold" : "text-blue-500"}`}>Contact</Link>
        </nav>
    );
};
