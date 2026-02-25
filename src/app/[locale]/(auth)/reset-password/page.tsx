import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import ResetPasswordForm from "@/components/features/auth/reset-password";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("resetPassword") };

export default async function ResetPassword() { return <ResetPasswordForm /> }