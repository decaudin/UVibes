import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import SignUpForm from "@/components/features/auth/sign-up";

export const metadata: Metadata = generateMetadata({
    title: "Sign Up",
    description: "Create your account to start using our services.",
    keywords: ["sign up", "register", "create account", "auth"],
    url: "https://u-vibes.vercel.app/sign-up"
});

export default function SignUpPage() { 
    return <SignUpForm /> 
}