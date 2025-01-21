"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-6xl my-8 sm:text-8xl"><span className="text-yellow-500">UV</span>IBES</h1>
            <h2 className="text-1xl sm:text-4xl">Glow safely, live brightly - check the UV!</h2>
            <Link href="/uv-check" className="transition-transform transform hover:scale-110 focus:scale-110">
                <Image src="/sun-1.jpg" alt="sun" width={249} height={100} className="text-yellow-500 my-16 w-auto h-auto" priority />
            </Link>
        </div>
    );
}