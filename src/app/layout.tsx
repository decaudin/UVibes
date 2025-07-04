import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/theme";
import SessionGate from "@/components/ui/SessionGate";
import "@/styles/globals.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "UVibes - UV Index and Sun Exposure Calculator",
    description: "Check UV index and optimize your sun exposure for better health.",
    keywords: ["UV index", "sun exposure", "vitamin D", "UVibes"],
    authors: [{ name: "Decaudin Xavier" }],
    openGraph: {
        title: "UVibes - UV Index and Sun Exposure Calculator",
        description: "Check UV index and optimize your sun exposure for better health.",
        url: "https://u-vibes.vercel.app/",
        siteName: "UVibes",
        images: ["https://u-vibes.vercel.app/sun-1.png"],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "UVibes - UV Index and Sun Exposure Calculator",
        description: "Check UV index and optimize your sun exposure for better health.",
        images: ["https://u-vibes.vercel.app/sun-1.png"]
    }
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 bg-opacity-50 min-h-screen flex flex-col`}>
                <ThemeProvider>
                    <SessionGate>
                        {children}                        
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
// 6 - Image affichées dans uv-check/results : améliorer le design
// 7 - (SEO) : Ajouter dans page About bouton pour accès à article et faire qqes articles, titre sous titre dans uv-checks et metadata en --> fr