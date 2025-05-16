import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import SignInForm from "@/components/features/auth/sign-in";

export const metadata: Metadata = generateMetadata({
    title: "Sign In",
    description: "Access your account to enjoy all our features and services.",
    keywords: ["sign in", "login", "auth", "account access"],
    url: "https://u-vibes.vercel.app/sign-in"
});

export default function SignIn() { 
    return <SignInForm /> 
}