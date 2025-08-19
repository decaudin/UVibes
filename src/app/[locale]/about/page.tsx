import type { LocaleParams } from "@/types/localeParams";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import AboutLink from "@/components/ui/AboutLink";

export async function generateMetadata() { return generateMetadataForIndexedPage("about") }

export default async function About({ params }: LocaleParams) {

    const { locale } = await params;

    const t = await getTranslations();

    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto my-20 md:w-3/5">
            <Image src="/about-uv.jpg" alt="sun-uv" width={249} height={100} className="mb-20 h-auto w-auto shadow-md"/>
            <p className="leading-relaxed mb-16">{t("aboutDescription")}</p>
            <div className="flex flex-col w-full space-y-6 items-center md:flex-row md:justify-between md:space-y-0 lg:w-4/5 xl:w-3/5">
                <AboutLink locale={locale} link="check-uv">{t("aboutCheckUvLink")}</AboutLink>
                <AboutLink locale={locale} link="about/guides">{t("aboutGuidesLink")}</AboutLink>
            </div>
        </div>
    )
}