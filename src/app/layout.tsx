import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/theme";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "UVibes",
    description: "UV Index and Sun Exposure Calculator",
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <ThemeProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 bg-opacity-50 min-h-screen flex flex-col`}>
                    <Header />
                    <main className="flex-grow flex justify-center">
                        {children}
                    </main>
                    <Footer />
                </body>
            </ThemeProvider>
        </html>
    );
}

// 1 - Envoie mail ( Brevo)
// 2 - Dans header gérer sign out
// 3 - Voir pour les boutons radios pour pouvoir en sélectionner plusieurs
// 4 - Faire connexion avec BDD MongoDb Atlas, définir modèle user, points enregistrés, caractéristique peau
// 5 - Implémenter dashbord pour enregistrer des points en favoris (nom, latitude, longitude) et caractéristique peau pour récupérer les données ensuite sans re-entrer ces infos
// 6 - Burger Menu ?