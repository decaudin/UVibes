import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import SignInForm from "@/components/features/auth/sign-in";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("signIn");
};

export default function SignIn() { 
    return <SignInForm /> 
}