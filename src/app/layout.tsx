import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/context/theme";
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
            <ThemeProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 bg-opacity-50 min-h-screen flex flex-col`}>
                    <Header />
                    <main className="flex-grow flex justify-center">
                        <Toaster richColors position="top-right" />
                        {children}                        
                    </main>
                    <Footer />
                </body>
            </ThemeProvider>
        </html>
    )
}

// 1 - Envoie mail ( Brevo ou Resent(?))
// 1(bis) - Sign In (via google)
// 2 - Dans header gérer sign out
// 3 - Voir pour les boutons radios pour pouvoir en sélectionner plusieurs
// 4 - définir modèle user, points enregistrés, caractéristique peau
// 5 - Implémenter dashbord pour enregistrer des points en favoris (nom, latitude, longitude) et caractéristique peau pour récupérer les données ensuite sans re-entrer ces infos
// 7 - Possibilité recherche ville via input (--> suggestion API) et récup via autre API (lat, lon et alt correspondantes)