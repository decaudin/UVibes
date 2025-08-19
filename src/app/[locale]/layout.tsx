import type { LocaleLayoutProps } from "@/types/localeLayoutProps";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const generateStaticParams = () => { return [{ locale: "en" }, { locale: "fr" }] };

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {

    const { locale } = await params;
    
    return (
        <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="flex-grow flex justify-center">
                <Toaster richColors position="top-right" closeButton />
                {children}
            </main>
            <Footer />
        </NextIntlClientProvider>
    )
}