import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = generateMetadata({
    title: "Home",
    description: "Check the UV index near you and plan your day in the sun safely. Glow safely, live brightly!",
    keywords: ["UV index", "UV forecast", "sun exposure time", "safe sun time", "UV calculator", "UV near me", "vitamin D", "UVibes"]
})

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-6xl my-8 sm:text-8xl"><span className="text-yellow-500">UV</span>IBES</h1>
            <h2 className="text-1xl sm:text-4xl">Glow safely, live brightly - check the UV!</h2>
            <Image src="/sun-1.jpg" alt="Bright sun illustration" /*width={249} height={100}*/ width={150} height={60} className="my-12 w-auto h-auto transition-transform transform hover:scale-110 focus:scale-110" priority />
            <Link href="/uv-check" className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition">
                Check the UV
            </Link>
        </div>
    )
}