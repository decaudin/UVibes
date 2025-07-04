import { Toaster } from "sonner";
import { I18nProviderClient } from "@/locales/client";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: { locale: string }}) {
    
    return (
        <I18nProviderClient locale={params.locale}>
            <Header />
            <main className="flex-grow flex justify-center">
                <Toaster richColors position="top-right" closeButton />
                {children}
            </main>
            <Footer />
        </I18nProviderClient>
    );
}