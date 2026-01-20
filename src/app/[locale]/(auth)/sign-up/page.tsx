import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import SignUpForm from "@/components/features/auth/sign-up";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("signUp") }

export default async function SignUp() { return <SignUpForm /> }