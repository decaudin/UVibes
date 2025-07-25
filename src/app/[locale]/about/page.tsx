import type { Props } from "@/types/pageProps";
import { JSX } from "react";
import Image from "next/image";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import AboutLink from "@/components/ui/AboutLink";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("about");
};

export default async function About({ params }: Props): Promise<JSX.Element> {

    const t = await getI18n();

    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto my-20 md:w-3/5">
            <Image src="/about-uv.jpg" alt="sun-uv" width={249} height={100} className="mb-20 h-auto w-auto shadow-md"/>
            <p className="leading-relaxed mb-16">{t("aboutDescription")}</p>
            <div className="flex flex-col w-full space-y-6 items-center md:flex-row md:justify-between md:space-y-0 lg:w-4/5 xl:w-3/5">
                <AboutLink locale={params.locale} link="check-uv">{t("aboutCheckUvLink")}</AboutLink>
                <AboutLink locale={params.locale} link="about/guides">{t("aboutGuidesLink")}</AboutLink>
            </div>
        </div>
    )
}