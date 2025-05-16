import { generateMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";

export const metadata = generateMetadata({
    title: "About",
    description: "Discover UVibes, a non-profit platform that offers accurate UV index data using the OpenUV API. Learn how we help you plan safe sun exposure with reliable, open-source information.",
    keywords: ["about UVibes", "UV API", "open source UV data", "how UVibes works", "UV data source"],
    url: "https://u-vibes.vercel.app/about"
});

export default function About() {

    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto my-20 sm:w-3/5">
            <Image src="/uv.jpg" alt="sun-uv" width={249} height={100} className="mb-20 h-auto w-auto shadow-md"/>
            <p className="leading-relaxed mb-16">This non-profit website provides UV data for the geographic area of your choice. Simply enter the latitude and longitude (in decimal degrees), along with the altitude, to access this information. The data is retreived with the open-source API https://www.openuv.io/.</p>
            <Link href="/uv-check" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">Check UV</Link>
        </div>
    )
}