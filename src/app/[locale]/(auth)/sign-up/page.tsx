import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import SignUpForm from "@/components/features/auth/sign-up";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("signUp");
};

export default function SignUpPage() { 
    return <SignUpForm /> 
}