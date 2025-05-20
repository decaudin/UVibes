"use client";
import { useTheme } from "@/hooks/context";

export default function Footer() {

    const { theme, toggleTheme } = useTheme();

    return (
        <footer className="h-16 bg-black flex items-center justify-center mt-6">
            <p className="text-white m-auto"><span className="cursor-pointer" onClick={() => toggleTheme()}>{theme === 'light' ? '☀️' : '🌙'}</span> Stay chill under the sun’s thrill!</p>
        </footer>
    )
}