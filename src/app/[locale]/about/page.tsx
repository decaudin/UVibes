import type { LocaleParams } from "@/types/localeParams";
import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import AboutHref from "@/components/ui/about/AboutHref";
import AboutLink from "@/components/ui/about/AboutLink";

export async function generateMetadata() { return generateMetadataForIndexedPage("about") }

export default async function About({ params }: LocaleParams) {

    const { locale } = await params;

    const t = await getTranslations();

    const gpsHref = locale === "fr" ? "https://www.coordonnees-gps.fr" : "https://www.latlong.net";

    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto my-20 md:w-3/5">
            <Image src="/about-uv.jpg" alt="sun-uv" width={249} height={100} className="mb-20 h-auto w-auto shadow-md"/>
            <p className="leading-relaxed">
                {t.rich("about.description", {openuvLink: (chunks) => <AboutHref href="https://www.openuv.io" chunks={chunks} />})}
            </p>
            <p className="leading-relaxed my-6">
                {t.rich("about.descriptionCoords", {
                    gpsLink: (chunks) => <AboutHref href={gpsHref} chunks={chunks} />,
                    elevationLink: (chunks) => <AboutHref href="https://www.freemaptools.com/elevation-finder.htm" chunks={chunks} />,
                    strong: (chunks) => <strong>{chunks}</strong>,
                })}
            </p>
            <p className="leading-relaxed mb-6">
                {t.rich("about.descriptionCity", {strong: (chunks) => <strong>{chunks}</strong>})}
            </p>
            <p className="leading-relaxed mb-16">
                {t("about.descriptionAccount")}
            </p>
            <div className="flex flex-col w-full space-y-6 items-center md:flex-row md:justify-between md:space-y-0 lg:w-4/5 xl:w-3/5">
                <AboutLink locale={locale} link="check-uv">{t("about.checkUvLink")}</AboutLink>
                <AboutLink locale={locale} link="about/guides">{t("about.guidesLink")}</AboutLink>
            </div>
        </div>
    )
}