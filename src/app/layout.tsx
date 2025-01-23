import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/context/theme";

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
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 bg-opacity-50 h-screen`}>
                    <Header />
                    {children}
                    <Footer />
                </body>
            </ThemeProvider>
        </html>
    );
}
