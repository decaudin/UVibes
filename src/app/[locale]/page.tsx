import type { Props } from "@/types/pageProps";
import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("home");
};

export default async function Home({ params } : Props): Promise<JSX.Element> {

    const t = await getI18n();

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-6xl my-8 sm:text-8xl"><span className="text-yellow-500">{t("uvibes.first")}</span>{t("uvibes.second")}</h1>
            <h2 className="text-1xl text-center sm:text-4xl">{t("homeSlogan")}</h2>
            <Image src="/home-sun.jpg" alt="Bright sun illustration" width={150} height={60} className="my-12 w-auto h-auto transition-transform transform hover:scale-110 focus:scale-110" priority />
            <Link href={`/${params.locale}/check-uv`} className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition">
                {t("homeButton")}
            </Link>
        </div>
    )
}