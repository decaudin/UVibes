import type { Metadata } from "next";
import type { LocaleParams } from "@/types/localeParams";
import type { LocaleLayoutProps } from "@/types/localeLayoutProps";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/context/theme";
import SessionGate from "@/components/ui/SessionGate";
import { Toaster } from "sonner";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "@/styles/globals.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 bg-opacity-50 min-h-screen flex flex-col`}>
                <ThemeProvider>
                    <SessionGate>                       
                        <NextIntlClientProvider locale={locale}>
                            <Header />
                            <main className="flex-grow flex justify-center">
                                <Toaster richColors position="top-right" closeButton />
                                {children}
                            </main>
                            <Footer />
                        </NextIntlClientProvider>
                    </SessionGate>
                </ThemeProvider>
            </body>
        </html>
    )
}

// 1 - Sign In (via google)
// 2 - Voir pour les boutons radios pour pouvoir en sélectionner plusieurs
// 3 - définir modèle user, points enregistrés, caractéristique peau
// 4 - Implémenter dashbord pour enregistrer, modifier, supprimer des points en favoris (nom, latitude, longitude) et caractéristique peau pour récupérer les données ensuite sans re-entrer ces infos
// 5 - Possibilité recherche ville via input (--> suggestion API) et récup via autre API (lat, lon et alt correspondantes)
// 6 - SEO/UX: Urls en EN/FR (Hreflang, Canonicalisation .. ?), siteMap ?
// 7 - Rendre custom page erreur fonctionnel (elle n'intercepte rien pour l'instant ..)
// 8 - Afficher les mêmes résultats si changement de langue sur results