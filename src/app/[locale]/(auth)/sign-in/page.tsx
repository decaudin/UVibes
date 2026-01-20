import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import SignInForm from "@/components/features/auth/sign-in";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("signIn") }

export default async function SignIn() { return <SignInForm /> }