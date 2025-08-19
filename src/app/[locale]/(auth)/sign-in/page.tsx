import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import SignInForm from "@/components/features/auth/sign-in";

export async function generateMetadata() { return generateMetadataForIndexedPage("signIn") }

export default async function SignIn() { return <SignInForm /> }