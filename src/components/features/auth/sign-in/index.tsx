"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormData, signInSchema } from "@/lib/schemas/authSchema";
import Form from "@/components/ui/Auth/Form";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { Loader } from "@/components/ui/Loader";
import { inputStyles, wrapperStyles } from "@/styles/classNames";

export default function SignInForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = !!(
        formValues.email &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email) &&
    
        formValues.password &&
        formValues.password.length >= 8 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password)
    );

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true); 
        try {
            const res = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                if (responseData.message === 'Invalid credentials') {
                    setError('email', { type: 'manual', message: 'Invalid email or password' });
                    setError('password', { type: 'manual', message: 'Invalid email or password' });
                }
    
                throw new Error(responseData.message || 'Something went wrong');
            }

            toast.success("You're in ! Redirecting to your Dashboard ...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push("/dashboard");

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Signin failed");
            } else {
                toast.error('Unknown signin error');
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isLoading ? (
                <Form title="Sign In" onSubmit={handleSubmit(onSubmit)}>
                    <Input  
                        id="email" type="text" label="Email :" placeholder="Enter your email" autoComplete="email" errorMessage={errors.email?.message} 
                        wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                        {...register('email')}
                    />
                    <PasswordInput autoComplete="current-password" errorMessage={errors.password?.message} register={register} />
                    <Input
                        id="isRememberMe" type="checkbox" label="Remember me"
                        wrapperClassName="flex justify-end flex-row-reverse" inputClassName="mr-1 cursor-pointer"
                        {...register("isRememberMe")}
                    />  
                    <SubmitButton isFormValid={isValid} isLoading={isLoading} className="my-8" >Sign In</SubmitButton>
                    <p className="mb-8 text-center">Don&#39;t have an account ? <Link className="text-red-500" href="/sign-up">Sign Up</Link></p>
                </Form>
            ) : (
                <Loader />
            )}
        </>
    )
}