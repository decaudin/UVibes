"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormData, signUpSchema } from "@/lib/schemas/authSchema";
import Form from "@/components/ui/Auth/Form";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { Loader } from "@/components/ui/Loader";

const wrapperStyles = "flex flex-col w-64 mb-10";
const inputStyles = "h-8 rounded-lg shadow mt-1 pl-2";

export default function SignUp() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = !!(
        formValues.name &&
        formValues.name.length >= 2 &&
        /^[a-zA-ZÀ-ÿ0-9]+([\- ][a-zA-ZÀ-ÿ0-9]+)*$/.test(formValues.name) &&
    
        formValues.email &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email) &&
    
        formValues.password &&
        formValues.password.length >= 8 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password)
    );

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true); 
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                if (responseData.message === 'User already exists. Please use a different email.') {
                    setError('email', { type: 'manual', message: responseData.message });
                }
    
                throw new Error(responseData.message || 'Something went wrong');
            }

            toast.success("Account created ! Taking you to the Sign In page ...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push("/sign-in");

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Signup failed");
            } else {
                toast.error('Unknown signup error');
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isLoading ? ( 
                <Form title="Sign Up" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="name" type="text" label="Name :" placeholder="Enter your name" autoComplete="name" errorMessage={errors.name?.message} 
                        wrapperClassName={wrapperStyles} inputClassName={inputStyles} 
                        {...register('name')}
                    />
                    <Input 
                        id="email" type="email" label="Email :" placeholder="Enter your email" autoComplete="email" errorMessage={errors.email?.message}
                        wrapperClassName={wrapperStyles} inputClassName={inputStyles}
                        {...register('email')}
                    />
                    <PasswordInput autoComplete="new-password" errorMessage={errors.password?.message} register={register} />
                    <SubmitButton isFormValid={isValid} isLoading={isLoading} className="my-8">Sign Up</SubmitButton>
                </Form> 
            ) : (   
                <Loader />
            )}
        </>
    );
}