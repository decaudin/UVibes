import type { LocaleParams } from "@/types/localeParams";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";

export async function generateMetadata() { return generateMetadataForIndexedPage("home") };

export default async function Home({ params }: LocaleParams){

    const { locale } = await params;
    
    const t = await getTranslations();

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-6xl my-8 sm:text-8xl"><span className="text-yellow-500">{t("uvibes.first")}</span>{t("uvibes.second")}</h1>
            <h2 className="text-1xl text-center sm:text-4xl">{t("homeSlogan")}</h2>
            <Image src="/home-sun.jpg" alt="Bright sun illustration" width={150} height={60} className="my-12 w-auto h-auto transition-transform transform hover:scale-110 focus:scale-110" priority />
            <Link href={`/${locale}/check-uv`} className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition">
                {t("homeButton")}
            </Link>
        </div>
    )
}