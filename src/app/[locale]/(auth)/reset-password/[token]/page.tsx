import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import ResetPasswordTokenForm from "@/components/features/auth/reset-password-token";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("resetPasswordToken") };

export default async function ResetPasswordToken() { return <ResetPasswordTokenForm /> }