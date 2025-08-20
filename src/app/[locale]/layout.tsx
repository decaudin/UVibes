import type { Metadata } from "next";
import type { LocaleParams } from "@/types/localeParams";
import type { LocaleLayoutProps } from "@/types/localeLayoutProps";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const generateStaticParams = () => { return [{ locale: "en" }, { locale: "fr" }] };

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {

    const { locale } = await params;
    
    const t = await getTranslations("seo.layout");

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords").split(",").map(k => k.trim()),
        authors: [{ name: "Decaudin Xavier" }],
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: locale === "fr" ? "https://u-vibes.vercel.app/fr" : "https://u-vibes.vercel.app/en",
            siteName: "UVibes",
            images: ["https://u-vibes.vercel.app/home-sun.png"],
            locale: locale === "fr" ? "fr_FR" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: ["https://u-vibes.vercel.app/home-sun.png"],
        }
    }
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {

    const { locale } = await params;
    
    return (
        <html lang={locale}>
            <NextIntlClientProvider locale={locale}>
                <Header />
                <main className="flex-grow flex justify-center">
                    <Toaster richColors position="top-right" closeButton />
                    {children}
                </main>
                <Footer />
            </NextIntlClientProvider>
        </html>
    )
}