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

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html>
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
// 6 - UI: Essayer de rendre plus attrayant/convivial : Images affichées dans uv-check/results, articles de guides&tips, design/ui général etc ..
// 7 - SEO/UX: Urls en EN/FR (Hreflang, Canonicalisation .. ?), siteMap ?
// 8 - Rendre custom page erreur fonctionnel (elle n'intercepte rien pour l'instant ..)