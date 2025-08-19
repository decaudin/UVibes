import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import SignUpForm from "@/components/features/auth/sign-up";

export async function generateMetadata() { return generateMetadataForIndexedPage("signUp") }

export default async function SignUp() { return <SignUpForm /> }